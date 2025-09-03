import { tokenStore, tempStore } from "./storage"
import { createCodeVerifier, createCodeChallenge, randomString } from "./pkce"

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string
const SCOPES = (import.meta.env.VITE_SPOTIFY_SCOPES as string) || ""

const ACCOUNTS = "https://accounts.spotify.com"
const TOKEN_URL = `${ACCOUNTS}/api/token`
const AUTHORIZE_URL = `${ACCOUNTS}/authorize`

type TokenResponse = {
  access_token: string
  token_type: "Bearer"
  expires_in: number
  scope?: string
  refresh_token?: string
};

function now() { return Date.now() }

// Public API

let callbackExchangeInFlight: Promise<void> | null = null

const AUTH_CHANGED_EVENT = "sp_auth_changed"
function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
  }
}

export async function startLogin() {
  const verifier = await createCodeVerifier()
  const challenge = await createCodeChallenge(verifier)
  const state = randomString(24)

  tempStore.verifier = verifier
  tempStore.state = state

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state
  })

  window.location.assign(`${AUTHORIZE_URL}?${params.toString()}`)
}

export async function handleCallback(currentUrl: string) {
  if (callbackExchangeInFlight) return callbackExchangeInFlight

  const url = new URL(currentUrl)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const error = url.searchParams.get("error")

  if (error) throw new Error(`OAuth error: ${error}`)
  if (!code) throw new Error("Missing authorization code")

  const savedState = tempStore.state
  if (!savedState || state !== savedState) {
    throw new Error("State mismatch")
  }

  const verifier = tempStore.verifier
  if (!verifier) throw new Error("Missing PKCE verifier")

  callbackExchangeInFlight = (async () => {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: verifier
    })

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    })

    if (!res.ok) {
      const txt = await res.text().catch(() => "")
      throw new Error(`Token exchange failed: ${res.status} ${txt}`)
    }

    const json = (await res.json()) as TokenResponse
    saveTokens(json)
    tempStore.clear()
  })()

  try {
    await callbackExchangeInFlight
  } finally {
    callbackExchangeInFlight = null
  }
}

export async function getAccessToken(): Promise<string | null> {
  const at = tokenStore.accessToken
  const exp = tokenStore.expiresAt ?? 0

  if (!at) return null
  if (now() < exp - 60_000) return at

  const refreshed = await refreshAccessToken().catch(() => null)
  return refreshed ? refreshed : null
}

export async function refreshAccessToken(): Promise<string> {
  const rt = tokenStore.refreshToken;
  if (!rt) throw new Error("No refresh_token available")

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: rt,
    client_id: CLIENT_ID
  })

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  })

  if (!res.ok) {
    clearSession()
    throw new Error(`Refresh failed: ${res.status}`)
  }

  const json = (await res.json()) as TokenResponse
  saveTokens(json, true)
  return tokenStore.accessToken!
}

export function logout() {
  clearSession()
}


function saveTokens(tr: TokenResponse, isRefresh = false) {
  tokenStore.accessToken = tr.access_token
  tokenStore.expiresAt = now() + (tr.expires_in * 1000) - 90_000
  tokenStore.scope = tr.scope ?? null
  if (tr.refresh_token) {
    // Spotify может не прислать refresh_token при некоторых refresh-запросах
    tokenStore.refreshToken = tr.refresh_token;
  } else if (!isRefresh && !tokenStore.refreshToken) {
    tokenStore.refreshToken = null
  }
  notifyAuthChanged()
}

function clearSession() {
  tokenStore.clearAll()
  notifyAuthChanged()
}

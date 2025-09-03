export const STORAGE_KEYS = {
  accessToken: "sp_access_token",
  refreshToken: "sp_refresh_token",
  expiresAt:   "sp_expires_at",   // в мс
  tokenScope:  "sp_token_scope",
} as const

export const TEMP_KEYS = {
  pkceVerifier: "pkce_verifier",
  oauthState:   "oauth_state",
} as const


export const tokenStore = {
  get accessToken() { return localStorage.getItem(STORAGE_KEYS.accessToken) },
  set accessToken(v: string | null) {
    if (v == null) localStorage.removeItem(STORAGE_KEYS.accessToken)
    else localStorage.setItem(STORAGE_KEYS.accessToken, v)
  },

  get refreshToken() { return localStorage.getItem(STORAGE_KEYS.refreshToken) },
  set refreshToken(v: string | null) {
    if (v == null) localStorage.removeItem(STORAGE_KEYS.refreshToken)
    else localStorage.setItem(STORAGE_KEYS.refreshToken, v)
  },

  get expiresAt() { 
    const v = localStorage.getItem(STORAGE_KEYS.expiresAt)
    return v ? Number(v) : 0
  },
  set expiresAt(v: number | null) {
    if (v == null) localStorage.removeItem(STORAGE_KEYS.expiresAt)
    else localStorage.setItem(STORAGE_KEYS.expiresAt, String(v))
  },

  get scope() { return localStorage.getItem(STORAGE_KEYS.tokenScope) },
  set scope(v: string | null) {
    if (v == null) localStorage.removeItem(STORAGE_KEYS.tokenScope)
    else localStorage.setItem(STORAGE_KEYS.tokenScope, v)
  },

  clearAll() {
    this.accessToken = null
    this.refreshToken = null
    this.expiresAt = null
    this.scope = null
  }
}

export const tempStore = {
  get verifier() { return sessionStorage.getItem(TEMP_KEYS.pkceVerifier) },
  set verifier(v: string | null) {
    if (v == null) sessionStorage.removeItem(TEMP_KEYS.pkceVerifier)
    else sessionStorage.setItem(TEMP_KEYS.pkceVerifier, v)
  },

  get state() { return sessionStorage.getItem(TEMP_KEYS.oauthState) },
  set state(v: string | null) {
    if (v == null) sessionStorage.removeItem(TEMP_KEYS.oauthState)
    else sessionStorage.setItem(TEMP_KEYS.oauthState, v)
  },

  clear() { this.verifier = null; this.state = null }
}


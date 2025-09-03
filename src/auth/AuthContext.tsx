import React, { createContext, useCallback, useEffect, useMemo, useState } from "react"
import { getAccessToken, logout, refreshAccessToken, startLogin } from "./spotifyAuth"
import { tokenStore } from "./storage"
import type { AuthState } from "../types"

const AuthCtx = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [status, setStatus] = useState<AuthState["status"]>("idle")

  useEffect(() => {
    let mounted = true

    async function init() {
      const token = await getAccessToken()
      if (!mounted) return
      if (token) {
        setAccessToken(token)
        setStatus("authenticated")
      } else {
        setAccessToken(null)
        setStatus("unauthenticated")
      }
    }
    init()

    const t = setInterval(async () => {
      if (!tokenStore.accessToken) return

      const exp = tokenStore.expiresAt ?? 0
      if (Date.now() >= exp - 60_000) {
        try {
          const t = await refreshAccessToken()
          setAccessToken(t)
          setStatus("authenticated")
        } catch {
          setAccessToken(null)
          setStatus("unauthenticated")
        }
      }
    }, 60_000)

    return () => { mounted = false; clearInterval(t) }
  }, [])

  const doLogin = useCallback(() => { startLogin() }, [])
  const doLogout = useCallback(() => {
    logout()
    setAccessToken(null)
    setStatus("unauthenticated")
  }, [])

  const value = useMemo<AuthState>(() => ({
    status, accessToken, login: doLogin, logout: doLogout
  }), [status, accessToken, doLogin, doLogout])

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
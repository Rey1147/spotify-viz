import { createContext, useContext } from "react"
import type { AuthState } from "../types"

const AuthCtx = createContext<AuthState | null>(null)

export const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
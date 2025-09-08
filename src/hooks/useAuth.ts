import { AuthCtx } from "@/auth/AuthContext"
import { useContext } from "react"

const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export default useAuth
export type AuthState = {
  status: "idle" | "unauthenticated" | "authenticated"
  accessToken: string | null
  login: () => void
  logout: () => void
}
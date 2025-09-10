export type AuthState = {
  status: "idle" | "unauthenticated" | "authenticated"
  accessToken: string | null
  login: () => void
  logout: () => void
}

export type User = {
  id: string,
  name: string,
  avatar?: string,
  country?: string,
  product?: string,
  email?: string
}
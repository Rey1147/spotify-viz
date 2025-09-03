import axios from "axios"
import { getAccessToken, refreshAccessToken, logout } from "./spotifyAuth"

export const api = axios.create({ baseURL: "https://api.spotify.com/v1" })

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Если вдруг поймали 401 — одна попытка рефреша и ретрая
let isRefreshing = false
let pending: Array<() => void> = []

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const { response, config } = error
    if (response?.status !== 401 || config.__isRetry) throw error

    if (!isRefreshing) {
      isRefreshing = true
      try {
        await refreshAccessToken()
        pending.forEach((fn) => fn())
      } catch {
        logout()
        pending = []
        isRefreshing = false
        throw error
      }
      isRefreshing = false
      pending = []
    }

    await new Promise<void>((resolve) => pending.push(resolve))
    config.__isRetry = true
    return api(config)
  }
)

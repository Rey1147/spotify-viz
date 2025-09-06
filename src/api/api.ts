import axios from "axios"
import { getAccessToken, refreshAccessToken } from "../auth/spotifyAuth"
import { tokenStore } from "@/auth/storage"

export const api = axios.create({ baseURL: "https://api.spotify.com/v1" })

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(undefined, async (err) => {
  const { response, config } = err
  if (!response) throw err

  if (response.status === 401 && !config.__isRetry) {
    try {
      await refreshAccessToken()
      config.__isRetry = true
      config.headers.Authorization = `Bearer ${tokenStore.accessToken}`
      return api(config);
    } catch {
      tokenStore.accessToken = null
      tokenStore.refreshToken = null
    }
  }

  if (response.status === 429 && !config.__rateLimited) {
    const retryAfter = Number(response.headers["retry-after"] ?? 1)
    await new Promise(r => setTimeout(r, Math.max(1, retryAfter) * 1000))
    config.__rateLimited = true
    return api(config)
  }
  throw err
})

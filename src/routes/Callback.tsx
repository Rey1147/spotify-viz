import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleCallback } from "@/auth/spotifyAuth"

export default function Callback() {
  const nav = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        await handleCallback(window.location.href)
        nav("/", { replace: true })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e?.message || "Authorization failed")
      }
    })();
  }, [nav]);

  if (error) return <div>Ошибка авторизации: {error}</div>
  return <div>Авторизация…</div>
}

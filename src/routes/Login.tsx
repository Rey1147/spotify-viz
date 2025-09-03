import { useAuth } from "@/auth/AuthContext"
import { Navigate } from "react-router-dom"

const Login = () => {
  const { login, status } = useAuth()
  if (status === "authenticated") return <Navigate to="/" replace />

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <button onClick={login} style={{ padding: "10px 16px", borderRadius: 12 }}>
        Log in with Spotify
      </button>
    </div>
  )
}

export default Login
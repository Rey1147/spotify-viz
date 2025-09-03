import { useAuth } from "@/auth/useAuth"

const Login = () => {
  const { login } = useAuth()

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <button onClick={login} style={{ padding: "10px 16px", borderRadius: 12 }}>
        Log in with Spotify
      </button>
    </div>
  )
}

export default Login
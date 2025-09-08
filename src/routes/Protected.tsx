import { Navigate, Outlet } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

const Protected = () => {
  const { status } = useAuth()
  if (status === "idle") return <div>Загрузка…</div>
  if (status === "unauthenticated") return <Navigate to="/login" replace />
  return <Outlet />
}

export default Protected

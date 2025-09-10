import { Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import useAuth from "@/hooks/useAuth"

const Protected = () => {
  const { status } = useAuth()
  if (status === "idle") return <div>Загрузка…</div>

  return (
    <ErrorBoundary fallbackRender={() => <div>Не удалось загрузить пользователя</div>}>
      <Outlet />
    </ErrorBoundary>
  )
}

export default Protected

import { Outlet, Navigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import UniversalPage from "@/pages/UniversalPage"
import useAuth from "@/hooks/useAuth"

const Protected = () => {
  const { status } = useAuth()

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />
  }

  return (
    <ErrorBoundary fallbackRender={() => <div>Не удалось загрузить пользователя</div>}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <UniversalPage>
          <Outlet />
        </UniversalPage>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Protected

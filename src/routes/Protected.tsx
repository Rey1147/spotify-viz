import { Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"

const Protected = () => {

  return (
    <ErrorBoundary fallbackRender={() => <div>Не удалось загрузить пользователя</div>}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Protected

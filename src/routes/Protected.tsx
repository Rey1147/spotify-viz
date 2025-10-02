import { Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import UniversalPage from "@/pages/UniversalPage"

const Protected = () => {

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

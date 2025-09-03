import { createBrowserRouter } from "react-router-dom"
import Protected from "./Protected"
import Login from "./Login"
import Callback from "./Callback"

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/callback", element: <Callback /> },
  {
    path: "/",
    element: <Protected />,
    children: [
      { index: true, element: <div>Дашборд</div> },
      { path: "playlist/:id", element: <div>Плейлист</div> }
    ]
  }
])
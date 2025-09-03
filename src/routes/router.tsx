import { createBrowserRouter } from "react-router-dom"
import Dashbord from "@/pages/Dashbord"
import Playlist from "@/pages/Playlist"
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
      { index: true, element: <Dashbord /> },
      { path: "playlist/:id", element: <Playlist /> }
    ]
  }
])
import { createBrowserRouter, redirect } from "react-router-dom"
import { STORAGE_KEYS } from "@/auth/storage"
import Dashbord from "@/pages/DashbordPage"
import Playlist from "@/pages/PlaylistPage"
import Profile from "@/pages/ProfilePage"
import Protected from "./Protected"
import Login from "./Login"
import Callback from "./Callback"

const guardLoader = () => {
  const at = localStorage.getItem(STORAGE_KEYS.accessToken)
  const expStr = localStorage.getItem(STORAGE_KEYS.expiresAt)
  const exp = expStr ? Number(expStr) : 0
  if (!at || !exp || Date.now() >= exp - 60_000) {
    return redirect("/login")
  }
  return null
}

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/callback", element: <Callback /> },
  {
    path: "/",
    loader: guardLoader,
    element: <Protected />,
    children: [
      { index: true, element: <Dashbord /> },
      { path: "playlist/:id", element: <Playlist /> },
      { path: "profile", element: <Profile /> }
    ]
  }
])
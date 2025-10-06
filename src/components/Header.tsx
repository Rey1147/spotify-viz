import useAuth from "@/hooks/useAuth"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import HeaderView from "@/view/Header/HeaderView"

const Header = () => {
  const { logout } = useAuth()
  const { user } = useCurrentUser()

  return (
    <HeaderView 
      user={user}
      logout={logout}
    />
  )
}

export default Header
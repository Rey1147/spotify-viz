import { useCurrentUser } from "@/hooks/useCurrentUser"
import ProfileInfoView from "@/view/ProfileInfo/ProfileInfoView"

const ProfileInfo = () => {
  const {user} = useCurrentUser()

  return (
    <ProfileInfoView 
      name={user.name}
      country={user.country}
      product={user.product}
      email={user.email}
      avatar={user.avatar}
    />
  )
}

export default ProfileInfo
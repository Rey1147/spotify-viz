import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useUserPlaylists } from "@/hooks/useUserPlaylists"
import { Link } from "react-router-dom"

const Dashbord = () => {
  const user = useCurrentUser()
  const { playlists } = useUserPlaylists()
  
  return (
    <>
      <div>Дашборд</div>
      <div>
        <h2>Информация о пользователе:</h2>
        <p><b>ID:</b> {user.id}</p>
        <p><b>Имя:</b> {user.name}</p>
        <p><b>Страна:</b> {user.country || 'Не указана'}</p>
        <p><b>Тип аккаунта:</b> {user.product || 'Не указан'}</p>
        <p><b>Email:</b> {user.email || 'Не указан'}</p>
        {user.avatar && (
          <div>
            <b>Аватар:</b>
            <img src={user.avatar} alt="Аватар пользователя" style={{ width: 100, height: 100, borderRadius: '50%' }} />
          </div>
        )}
        <div>
          <h3>Плейлисты ({playlists?.length || 0}):</h3>
           {playlists?.map(playlist => (
             <div key={playlist.id}>
               <img src={playlist.image || undefined} alt="" />
               <div>{playlist.name}</div>
               <Link to={`/playlist/${playlist.id}`}>
                 Открыть плейлист
               </Link>
             </div>
           ))}
        </div>
      </div>
    </>
  )
}

export default Dashbord
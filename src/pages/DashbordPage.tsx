import { Link } from "react-router-dom"
import { useUserPlaylists } from "@/hooks/useUserPlaylists"

const Dashbord = () => {
  const { playlists } = useUserPlaylists()
  
  return (
    <>
      <div>Дашборд</div>
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
    </>
  )
}

export default Dashbord
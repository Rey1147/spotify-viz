import { useUserPlaylists } from "@/hooks/useUserPlaylists"
import PlaylistListView from "@/view/Playlist/PlaylistListView";

const PlaylistList = () => {
  const { playlists } = useUserPlaylists()
  console.log(playlists);

  return (
    <PlaylistListView 
      playlists={playlists}
    />
  )
}

export default PlaylistList
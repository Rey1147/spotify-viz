import { usePlaylistTracks } from "@/hooks/usePlaylistTracks";
import { useParams } from "react-router-dom";

const Playlist = () => {
  const params = useParams()
  const { tracks } = usePlaylistTracks(params.id!)

  console.log(tracks)
  

  return (
    <>Плейлист</>
  )
}

export default Playlist
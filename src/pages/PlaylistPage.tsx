import { usePlaylistTracks } from "@/hooks/usePlaylistTracks";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useParams } from "react-router-dom";
import TrackItem from "@/components/TrackItem";
import { useQuery } from "@tanstack/react-query";
import UserApiService from "@/api/user/index"
import PlayerApiService from "@/api/player/index"
import { QUERY_KEYS } from "@/const";

const Playlist = () => {
  const params = useParams()
  const { isLoading: userLoading } = useCurrentUser()
  const { tracks } = usePlaylistTracks(params.id || '')

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.DEVICES],
    queryFn: () => UserApiService.getUserDevice(),
    enabled: !userLoading,
    staleTime: 30_000,
  })

  const { data: player } = useQuery({
    queryKey: [QUERY_KEYS.PLAYER],
    queryFn: () => PlayerApiService.transferPlayback(data.devices),
    enabled: Boolean(data),
    staleTime: 30_000,
  })
  console.log(player)

  return (
    <div>
      <div>
        <h1>Плейлист</h1>
        <p>
          {tracks?.total} треков
        </p>
      </div>

      <div>
        {tracks?.items.map((item, index) => (
          <TrackItem 
            key={item.track.id} 
            track={item.track} 
            index={index} 
          />
        ))}
      </div>
    </div>
  )
}

export default Playlist
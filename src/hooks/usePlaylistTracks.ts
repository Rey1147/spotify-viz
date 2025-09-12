import { useQuery } from "@tanstack/react-query"
import PlaylistApiService from '@/api/playlist/index'
import { QUERY_KEYS } from "@/const"
import { useCurrentUser } from "./useCurrentUser"

export const usePlaylistTracks = (
  id: string,
  limit?: number,
  country?: string,
  offset?: number
) => {
  const user = useCurrentUser()

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_TRACKS_INFINITE, id, { limit, country, offset }],
    queryFn: () => PlaylistApiService.getTracks(
      id,
      user.country ?? country ?? 'DE',
      limit ?? 100,
      offset ?? 0
    ),
    staleTime: 15 * 60 * 1000,
    enabled: !!id
  })
  return { tracks: data }
}
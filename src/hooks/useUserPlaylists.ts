import { useQuery } from "@tanstack/react-query"
import UserApiService from '@/api/user/index'
import { QUERY_KEYS } from "@/const"

export const useUserPlaylists = (limit = 50) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST, {limit}],
    queryFn: () => UserApiService.getUserPlaylists(limit),
    staleTime: 15 * 60 * 1000
  })
  return { playlists: data }
}
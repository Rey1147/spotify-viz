import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/const"
import PlayerApiService from "@/api/player/index"
import type { CurrentlyPlaying } from "@/types"

export const useCurrentlyPlaying = () => {
  const { data, error, isLoading, isFetching, refetch } = useQuery<CurrentlyPlaying | undefined>({
    queryKey: [QUERY_KEYS.CURRENTLY_PLAYING],
    queryFn: async () => {
      try {
        return await PlayerApiService.getCurrentlyPlaying()
      } catch (e: any) {
        if (e?.response?.status === 204) return undefined
        throw e
      }
    },
    refetchInterval: 5_000,
    staleTime: 5_000,
  })

  return { nowPlaying: data, error, isLoading, isFetching, refetch }
}

export default useCurrentlyPlaying




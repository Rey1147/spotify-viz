import { useQuery } from "@tanstack/react-query"
import UserApiService from "@/api/user/index"
import { QUERY_KEYS } from "@/const"
import type { User } from "@/types"

export const useCurrentUser = () => {
  const cached = (() => {
    const raw = localStorage.getItem(QUERY_KEYS.ME)
    return raw ? (JSON.parse(raw) as User) : undefined
  })()

  const { data } = useQuery<User, Error>({
    queryKey: [QUERY_KEYS.ME],
    queryFn: () => UserApiService.getUser(),
    enabled: true,
    throwOnError: true,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...(cached ? { initialData: cached } as const : {}),
  })

  return data as User
}
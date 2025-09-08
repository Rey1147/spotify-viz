import { QueryClient } from "@tanstack/react-query"
import type { QUERY_KEYS } from "@/const"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 2
    }
  }
})

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS]
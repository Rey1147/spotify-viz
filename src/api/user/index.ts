import type { User } from "@/types";
import { api } from "../api"

type Image = { url: string; width?: number; height?: number };
type PublicUser = { display_name?: string | null };
type PlaylistTracksRef = { total: number };

interface SimplifiedPlaylist {
  id: string
  name: string
  images?: Image[]
  tracks: PlaylistTracksRef
  owner?: PublicUser
  public?: boolean | null
}

interface Paging<T> {
  items: T[]
  next: string | null
  limit: number
  offset: number
  total: number
}

interface UserPlaylistSummary {
  id: string
  name: string
  image: string | null,
  tracks: PlaylistTracksRef | null
  tracksTotal: number
  owner: string
  public: boolean
}

class UserApiService {
  getUser = async (): Promise<User> => {
    const { data } = await api.get('/me')
    return {
      ...data,
      avatar: data.images?.[0]?.url ?? null
    }
  }

  getUserPlaylists = async (limit = 50): Promise<UserPlaylistSummary[]> => {
    const pageSize = Math.min(Math.max(limit, 1), 50)
    const all: SimplifiedPlaylist[] = []
    let offset = 0
    let hasNext: boolean

    do {
      const { data } = await api.get<Paging<SimplifiedPlaylist>>('/me/playlists', {
        params: { limit: pageSize, offset },
      })
      all.push(...data.items)
      hasNext = Boolean(data.next)
      offset += data.items.length
    } while (hasNext)

    return all.map<UserPlaylistSummary>((p) => ({
      id: p.id,
      name: p.name,
      image: p.images?.[0]?.url ?? null,
      tracks: p.tracks ?? null,
      tracksTotal: p.tracks?.total ?? 0,
      owner: p.owner?.display_name ?? '',
      public: Boolean(p.public),
    }))
  }

  getTop = async (
    type: 'artists'|'tracks', 
    time_range: 'short_term'|'medium_term'|'long_term'='medium_term', 
    limit=20, 
    offset=0
  ) => {
    const { data } = await api.get(`/me/top/${type}`, { params: { time_range, limit, offset }})
    return data.items
  }

  getSavedTracks = async (limit = 50, offset = 0) => {
    const { data } = await api.get('/me/tracks', { params: { limit, offset }})
    return data.items
  }

  search = async (query: string, type = 'track') => {
    const { data } = await api.get('/search', {
      params: { q: query, type, limit: 10 },
    })
    return data
  }
}

export default new UserApiService
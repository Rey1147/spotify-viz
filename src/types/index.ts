export type AuthState = {
  status: "idle" | "unauthenticated" | "authenticated"
  accessToken: string | null
  login: () => void
  logout: () => void
}

export type User = {
  id: string,
  name: string,
  avatar?: string,
  country?: string,
  product?: string,
  email?: string
}

export type Track = {
  id: string
  name: string
  artists: Array<{
    name: string
  }>
  album: {
    name: string
    images: Array<{
      url: string
      width: number
      height: number
    }>
  }
  duration_ms: number
  explicit: boolean
  popularity: number
}

export type PlaylistTracksResponse = {
  items: Array<{
    track: Track
  }>
  total: number
  limit: number
  offset: number
  next: string | null
  previous: string | null
}

export type CurrentlyPlaying = {
  timestamp: number
  progress_ms: number | null
  is_playing: boolean
  item: Track | null
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown'
}

export type Playlist = {
  id: string
  image: string | null
  name: string
  owner: string
}

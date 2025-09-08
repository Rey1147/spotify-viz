import { api } from "./api"

export const getPlaylistInfo = async (playlist_id: string) => {
  const { data } = await api.get(`/playlists/${playlist_id}`)
  return data
}

export const getPlaylistTracks = async (
  playlist_id: string,
  country = "DE",
  limit = 100,
  offset = 0
) => {
  const fields ="items(track(id,name,artists(name),album(name,images),duration_ms,explicit,popularity))," +
                "total,limit,offset,next,previous"

  const { data } = await api.get(`/playlist/${playlist_id}/tracks`, { params: { country, fields, limit, offset } })
  return data
}
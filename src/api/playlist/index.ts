import { api } from "../api"

class PlaylistApiService {
  getInfo = async (id: string) => {
    const { data } = await api.get(`/playlist/${id}`)
    return data
  }

  getTracks = async (
    id: string,
    country = 'DE',
    limit = 100,
    offset = 0
  ) => {
    const fields = 'items(track(id,name,artists(name),album(name,images),duration_ms,explicit,popularity)),' +
                   'total,limit,offset,next,previous'
    const { data } = await api.get(`/playlist/${id}/tracks`, {
      params: {country, fields, limit, offset}
    })
    return data
  }
}

export default new PlaylistApiService
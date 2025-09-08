import { api } from "./api"

export class AudioApiServiсe {
  getFeature = async (id: string) => {
    const { data } = await api.get(`/audio-features/${id}`)
    return data
  }

  // до 100 треков
  getFeatures = async (ids: string[]) => {
    const { data } = await api.get('/audio-features', {
      params: { ids: ids.join(',') }
    })
    return data.audio_features
  }

  // более 100 треков
  getAllFeatures = async (ids: string[]) => {
    const chunks: string[][] = []
    const result = []
    for (let i = 0; i < ids.length; i += 100) {
      chunks.push(ids.splice(i, i + 100))
    }

    for (const chunk of chunks) {
      const { data } = await api.get('/audio-features', {
        params: { ids: chunk.join(',') }
      }) 
      result.push(...data.audio_features)
    }

    return result
  }

  getAnalysis = async (id: string) => {
    const { data } = await api.get(`/audio-analysis/${id}`)
    return data
  } 
}
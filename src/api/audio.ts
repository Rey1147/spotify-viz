import { api } from "./api"

export const getAudioFeature = async (id: string) => {
  const { data } = await api.get(`/audio-features/${id}`)
  return data
}

// до 100 треков
export const getAudioFeatures = async (ids: string[]) => {
  const { data } = await api.get("/audio-features", {
    params: { ids: ids.join(",") },
  })
  return data.audio_features
}

export const getAllAudioFeatures = async (ids: string[]) => {
  const chunks: string[][] = []
  for (let i = 0; i < ids.length; i += 100) {
    chunks.push(ids.slice(i, i + 100))
  }

  const results = []
  for (const chunk of chunks) {
    const { data } = await api.get("/audio-features", {
      params: { ids: chunk.join(",") },
    })
    results.push(...data.audio_features)
  }

  return results
}

export const getAudioAnalysis = async (id: string) => {
  const { data } = await api.get(`/audio-analysis/${id}`)
  return data
}
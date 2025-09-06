import { api } from "./api"

export async function getMe() {
  const { data } = await api.get("/me")
  return {
    id: data.id,
    name: data.display_name ?? data.id,
    avatar: data.images?.[0]?.url ?? null,
    country: data.country ?? null,
    product: data.product ?? null,
    email: data.email ?? null
  }
}

export async function getAllMyPlaylists(limit = 50) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let offset = 0; const items: any[] = []
  for (;;) {
    const { data } = await api.get("/me/playlists", { params: { limit, offset }})
    items.push(...data.items)
    if (!data.next) break
    offset += limit
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return items.map((p: any) => ({
    id: p.id,
    name: p.name,
    image: p.images?.[0]?.url ?? null,
    tracksTotal: p.tracks?.total ?? 0,
    owner: p.owner?.display_name ?? "",
    public: Boolean(p.public),
  }))
}

export async function getTop(
  type: "artists"|"tracks", 
  time_range: "short_term"|"medium_term"|"long_term"="medium_term", 
  limit=20, 
  offset=0
) {
  const { data } = await api.get(`/me/top/${type}`, { params: { time_range, limit, offset }})
  return data.items
}

export async function getSavedTracks(limit=50, offset=0) {
  const { data } = await api.get("/me/tracks", { params: { limit, offset }})
  return data.items
}

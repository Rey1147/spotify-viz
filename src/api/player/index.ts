import { api } from "../api";

class PlayerApiService {
  async transferPlayback(deviceId: string) {
    await api.put("/me/player", { device_ids: [deviceId], play: false })
    return { ok: true }
  }

  async getCurrentlyPlaying() {
    const { data } = await api.get("/me/player/currently-playing")
    return data
  }
}

export default new PlayerApiService
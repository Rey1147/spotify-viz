import { api } from "../api";

class PlayerApiService {
  transferPlayback(deviceId: string) {
    const { data } = api.put("/me/player", { device_ids: [deviceId], play: false })
    return data.devices
  }
}

export default new PlayerApiService
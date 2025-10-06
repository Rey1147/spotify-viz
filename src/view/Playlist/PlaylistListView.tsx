import type { Playlist } from "@/types"
import styles from './index.module.scss'
import PlaylistView from "./PlaylistView"

type PlaylistProps = {
  playlists: Playlist[] | undefined
}

const PlaylistListView = ({ playlists } : PlaylistProps) => {
  return (
    <div className={styles.playlistlist}>
      <h3 className={styles.playlistlist__title}>Плейлисты ({playlists?.length || 0}):</h3>
      <div className={styles.playlistlist__items}>
        {playlists?.map(playlist => (
          <PlaylistView playlist={playlist}/>
        ))}
      </div>
    </div>
  )
}

export default PlaylistListView
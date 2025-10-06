import { Link } from "react-router-dom"
import type { Playlist } from "@/types"
import styles from "./index.module.scss"

const PlaylistView = ({ playlist }: { playlist: Playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`} className={styles.playlist__link}>
      <div key={playlist.id} className={styles.playlist}>
        <img
          src={playlist.image ?? undefined}
          className={styles.playlist__image}
          alt={`image playlist ${playlist.name}`}
        />
        <div className={styles.playlist__description}>
          <p className={styles.playlist__description_name}>{playlist.name}</p>
          <p className={styles.playlist__description_owner}>{playlist.owner}</p>
        </div>
      </div>
    </Link>
  )
}

export default PlaylistView
import styles from './index.module.scss'

type PlayerViewProps = {
  albumImage?: { url: string }
  track: {
    name: string
    explicit?: boolean
    album: { name: string }
  } | null | undefined
  artists: string | undefined
  isPlaying?: boolean | undefined
  formatDuration: (ms: number) => string
  displayProgress: number,
  durationMs: number
}

// TODO: вынести прогресс бар в отдельный компонент и добавить логику при product === 

const PlayerView = (props: PlayerViewProps) => {
  const {albumImage, track, artists, formatDuration, displayProgress, durationMs} = props
  return (
    <div className={styles.player}>
      {albumImage && (
        <img src={albumImage.url} className={styles.player__image} alt={track?.album.name}/>
      )}
      <div className={styles.player__track}>
        <div className={styles.player__track_name}>
          <span className={styles.player__track_name_inline}>
            {track?.name}
            {track?.explicit && <span>E</span>}
          </span>
        </div>
        <div className={styles.player__track_artists}>{artists}</div>
      </div>
      <div className={styles.player__controls}>
        {/* {isPlaying ? '⏸️' : '▶️'} */}
        <div className={styles.player__progressbar}>
          <span>{displayProgress != null ? formatDuration(displayProgress) : '--'}</span>
          <div className={styles.player__progressbar_control}></div>
          <span>{durationMs != null ? formatDuration(durationMs) : '--'}</span>
        </div>
      </div>
    </div>
  )
}

export default PlayerView

import Player from "@/components/Player"
import useCurrentlyPlaying from "@/hooks/useCurrentlyPlaying"

import styles from "../styles/index.module.scss"

const UniversalPage = ({ children }: { children: React.ReactNode }) => {
  const { nowPlaying } = useCurrentlyPlaying()

  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        {children}
        <Player
          track={nowPlaying?.item ?? null}
          isPlaying={nowPlaying?.is_playing}
          progressMs={nowPlaying?.progress_ms ?? null}
        />
      </main>
    </div>
  )
}

export default UniversalPage
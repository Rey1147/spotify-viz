
import Player from "@/components/Player"
import useCurrentlyPlaying from "@/hooks/useCurrentlyPlaying"

const UniversalPage = ({ children }: { children: React.ReactNode }) => {
  const { nowPlaying } = useCurrentlyPlaying()

  return (
    <div>
      {children}
      <Player
        track={nowPlaying?.item ?? null}
        isPlaying={nowPlaying?.is_playing}
        progressMs={nowPlaying?.progress_ms ?? null}
      />
    </div>
  )
}

export default UniversalPage
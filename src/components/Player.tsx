import { useEffect, useState } from "react"
import type { Track } from "@/types"
import PlayerView from "@/view/Player/PlayerView"

type Props = {
  track: Track | null | undefined
  isPlaying: boolean | undefined
  progressMs: number | null | undefined
}

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const Player = ({ track, isPlaying, progressMs }: Props) => {
  const [displayProgress, setDisplayProgress] = useState<number>(progressMs ?? 0)
  const durationMs = track?.duration_ms ?? 0
  
  useEffect(() => {
    setDisplayProgress(progressMs ?? 0)
  }, [track?.id, progressMs])
  
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setDisplayProgress(prev => Math.min(prev + 1000, durationMs))
    }, 1000)
    return () => clearInterval(id)
  }, [isPlaying, durationMs])


  const albumImage = track?.album.images.find(img => img.width === 64) || track?.album.images[0]
  const artists = track?.artists.map(artist => artist.name).join(', ')

  return (
    <PlayerView 
      albumImage={albumImage}
      track={track}
      artists={artists}
      isPlaying={isPlaying}
      formatDuration={formatDuration}
      displayProgress={displayProgress}
      durationMs={durationMs}
    />
  )
}

export default Player




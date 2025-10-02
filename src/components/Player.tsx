import type { Track } from "@/types"
import { useEffect, useState } from "react"

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
  const durationMs = track?.duration_ms ?? 0

  const [displayProgress, setDisplayProgress] = useState<number>(progressMs ?? 0)

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

  if (!track) return null

  const albumImage = track.album.images.find(img => img.width === 64) || track.album.images[0]
  const artists = track.artists.map(artist => artist.name).join(', ')

  return (
    <div>
      {albumImage && (
        <img src={albumImage.url} alt={track.album.name} width={64} height={64} />
      )}
      <div>
        <div>{track.name}{track.explicit && <span> E</span>}</div>
        <div>{artists}</div>
      </div>
      {isPlaying ? '▶️' : '⏸️'}
      <div>
        <span>{displayProgress != null ? formatDuration(displayProgress) : '--:--'}</span>
        <span> / {formatDuration(durationMs)}</span>
      </div>
    </div>
  )
}

export default Player




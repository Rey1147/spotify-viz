import type { Track } from "@/types"

interface TrackItemProps {
  track: Track
  index: number
}

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const TrackItem = ({ track }: TrackItemProps) => {
  const albumImage = track.album.images.find(img => img.width === 64) || track.album.images[0]
  const artists = track.artists.map(artist => artist.name).join(', ')

  return (
    <div>
      {albumImage && (
        <img 
          src={albumImage.url} 
          alt={track.album.name}
          width={64}
          height={64}
        />
      )}
      
      <div>
        <div>
          {track.name}
          {track.explicit && <span> E</span>}
        </div>
        <div>
          {artists}
        </div>
        <div>
          {track.album.name}
        </div>
      </div>
      
      <div>
        <div>
          <div 
            style={{ width: `${track.popularity}%` }}
          />
        </div>
        <span>{track.popularity}</span>
      </div>
      
      <div>
        {formatDuration(track.duration_ms)}
      </div>
    </div>
  )
}

export default TrackItem

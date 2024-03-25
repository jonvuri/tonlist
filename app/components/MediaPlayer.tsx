import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'

interface MediaPlayerProps {
  url: string
  initTime: number
}

const MediaPlayer = ({ url, initTime }: MediaPlayerProps) => {
  const playerRef = useRef<ReactPlayer>(null)
  const [playing, setPlaying] = useState(true)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState<number | null>(null)

  const stopVideo = () => {
    setPlaying(false)
  }

  const playVideo = () => {
    setPlaying(true)
  }

  const onProgress = (state: { playedSeconds: number }) => {
    // Only update playedSeconds if we're not seeking to avoid jumping
    if (seekTime === null) {
      setPlayedSeconds(state.playedSeconds)
    }
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the seekTime state but don't seek yet
    setSeekTime(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = () => {
    // When the mouse is released, perform the seek if seekTime is set
    if (seekTime !== null) {
      playerRef.current?.seekTo(seekTime, 'seconds')
      setPlayedSeconds(seekTime)
      setSeekTime(null) // Reset seekTime after seeking
    }
  }

  useEffect(() => {
    setPlayedSeconds(initTime)
  }, [url, initTime])

  return ReactPlayer.canPlay(url) ? (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        onDuration={setDuration}
        onProgress={onProgress}
      />
      <div>
        <button onClick={stopVideo}>Stop</button>
        <button onClick={playVideo}>Play</button>
        <input
          type="range"
          min={0}
          max={duration}
          value={seekTime !== null ? seekTime : playedSeconds}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp} // Seek when mouse button is released
          onTouchEnd={handleSeekMouseUp} // Also seek when touch ends for touch devices
        />
      </div>
    </div>
  ) : (
    <div>Error: Invalid Link</div>
  )
}

export default MediaPlayer

import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'
import { Button, Slider } from '@carbon/react'
import { PlayFilledAlt, StopFilledAlt } from '@carbon/icons-react'

import styles from './MediaPlayer.module.sass'

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

  const handleSeekRelease = () => {
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
    <div className={styles['player-container']}>
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        onDuration={setDuration}
        onProgress={onProgress}
      />
      <div style={{ display: 'flex' }}>
        <Button renderIcon={PlayFilledAlt} hasIconOnly onClick={playVideo} />
        <Button
          renderIcon={StopFilledAlt}
          hasIconOnly
          style={{ marginLeft: '1px' }}
          onClick={stopVideo}
        />
        <Slider
          className={styles['seek-slider']}
          inputType="range"
          hideTextInput
          min={0}
          max={duration}
          formatLabel={() => ''} // Hide numerical min/max labels
          value={seekTime !== null ? seekTime : playedSeconds}
          onChange={({ value }) => {
            setSeekTime(value)
          }}
          onRelease={handleSeekRelease} // Seek when handle is released
        />
      </div>
    </div>
  ) : (
    <div>Error: Invalid Link</div>
  )
}

export default MediaPlayer

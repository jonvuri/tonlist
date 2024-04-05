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
  const [duration, setDuration] = useState(0)
  const [sliderProgress, setSliderProgress] = useState(0)
  const [sliderClicked, setSliderClicked] = useState(false)

  const onProgress = (state: { playedSeconds: number }) => {
    // Only update playedSeconds if we're not currently interacting with the
    // slider, to avoid it jumping around underneath us
    if (!sliderClicked) {
      setSliderProgress(state.playedSeconds)
    }
  }

  useEffect(() => {
    setSliderProgress(initTime)
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
        <Button
          renderIcon={PlayFilledAlt}
          hasIconOnly
          onClick={() => setPlaying(true)}
        />
        <Button
          renderIcon={StopFilledAlt}
          hasIconOnly
          style={{ marginLeft: '1px' }}
          onClick={() => setPlaying(false)}
        />
        {/* Necessary to handle these events with a wrapper because the
         * Slider change events stop working with an onMouseUp attached
         */}
        <div
          onMouseDown={() => setSliderClicked(true)}
          onMouseUp={() => setSliderClicked(false)}
        >
          <Slider
            className={styles['seek-slider']}
            inputType="range"
            hideTextInput
            min={0}
            max={duration}
            formatLabel={() => ''} // Hide numerical min/max labels
            value={sliderProgress}
            onChange={({ value }) => {
              setSliderProgress(value)
            }}
            onRelease={() => {
              if (sliderProgress !== null) {
                playerRef.current?.seekTo(sliderProgress, 'seconds')
              }
              setSliderClicked(false)
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>Error: Invalid Link</div>
  )
}

export default MediaPlayer

'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import YouTubePlayer from 'youtube-player'

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

type YTPlayer = ReturnType<typeof YouTubePlayer>

type Props = {
  songId: string
  songStart: number // in seconds
}

const YoutubeEmbed = ({ songId, songStart }: Props) => {
  const previousSongId = usePrevious(songId)
  const [startingSongId] = useState(songId)
  const [startingSongStart] = useState(songStart)
  const iframeEl = useRef<HTMLIFrameElement | null>(null)
  const [player, setPlayer] = useState<YTPlayer | null>(null)

  useEffect(() => {
    if (iframeEl.current) {
      const player = YouTubePlayer('youtube-replace', {
        width: '640',
        height: '360',
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
        },
      })

      player.on('ready', async (event) => {
        await player.loadVideoById(startingSongId, startingSongStart)
        player.playVideo()
      })

      setPlayer(player)
    }
  }, [iframeEl, startingSongId, startingSongStart])

  useEffect(() => {
    if (player && songId !== previousSongId) {
      player.loadVideoById(songId, songStart)
    }
  }, [player, songId, songStart, previousSongId])

  return <div ref={iframeEl} id="youtube-replace" />
}

export default memo(YoutubeEmbed)

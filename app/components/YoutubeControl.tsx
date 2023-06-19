'use client'

import React, { useState } from 'react'

import YoutubePlayer from './YoutubePlayer'

const YoutubeControl = () => {
  const [songId, setSongId] = useState('jsd2VSZVTF8')
  const [songStart, setSongStart] = useState(90)
  const [shown, setShown] = useState(false)

  const changeSong = () => {
    setSongId('GiG1piHDE2k')
    setSongStart(60)
  }

  const show = () => {
    setShown(true)
  }

  return (
    <div>
      <h1>YoutubeControl</h1>
      <button onClick={show}>Show</button>
      <button onClick={changeSong}>Change Song</button>
      {shown && <YoutubePlayer songId={songId} songStart={songStart} />}
    </div>
  )
}

export default YoutubeControl

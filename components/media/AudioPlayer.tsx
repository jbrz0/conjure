'use client'

import React from 'react'

export interface AudioPlayerProps { src: string; controls?: boolean }

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, controls = true }) => {
  return (
    <audio src={src} controls={controls} style={{ width: '100%' }} />
  )
}



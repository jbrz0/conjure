'use client'

import React from 'react'

export interface VideoEmbedProps { src: string; controls?: boolean }

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, controls = true }) => {
  return (
    <video src={src} controls={controls} style={{ maxWidth: '100%', borderRadius: 8 }} />
  )
}



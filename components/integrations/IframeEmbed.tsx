'use client'

import React from 'react'

export interface IframeEmbedProps { url: string; width?: number; height?: number }

export const IframeEmbed: React.FC<IframeEmbedProps> = ({ url, width = 600, height = 400 }) => {
  return <iframe src={url} width={width} height={height} style={{ border: 'none', borderRadius: 8, width: '100%' }} />
}



'use client'

import React from 'react'
import Image from 'next/image'
import Box from '@mui/joy/Box'

export interface MediaCarouselProps { items: { url: string; alt?: string }[] }

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ items }) => {
  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, p: 1, scrollSnapType: 'x mandatory' }}>
      {items.map((it, idx) => (
        <div key={idx} style={{ scrollSnapAlign: 'start' }}>
          <Image src={it.url} alt={it.alt || 'item'} width={360} height={220} className="rounded-md w-full h-auto" />
        </div>
      ))}
    </Box>
  )
}



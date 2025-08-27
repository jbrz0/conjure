'use client'

import React from 'react'
import Image from 'next/image'
import Box from '@mui/joy/Box'

export interface ImageGalleryProps { images: { url: string; alt?: string }[] }

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1 }}>
      {images.map((img, idx) => (
        <Image key={idx} src={img.url} alt={img.alt || 'image'} width={320} height={200} className="rounded-md w-full h-auto" />
      ))}
    </Box>
  )
}



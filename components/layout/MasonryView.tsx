'use client'

import React from 'react'
import Box from '@mui/joy/Box'

export interface MasonryViewProps { items: { content: string }[] }

export const MasonryView: React.FC<MasonryViewProps> = ({ items }) => {
  // Simple CSS columns masonry
  return (
    <Box sx={{ columnCount: { xs: 1, sm: 2, md: 3 }, columnGap: 16 }}>
      {items.map((it, idx) => (
        <div key={idx} style={{ breakInside: 'avoid', marginBottom: 16, background: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 8 }}>
          {it.content}
        </div>
      ))}
    </Box>
  )
}



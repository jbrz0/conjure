'use client'

import React from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export interface TimelineItem { label: string; timestamp?: string; description?: string }
export interface DynamicTimelineProps { items: TimelineItem[] }

export const DynamicTimeline: React.FC<DynamicTimelineProps> = ({ items }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {items.map((it, idx) => (
        <Box key={idx} sx={{ borderLeft: '2px solid', borderColor: 'neutral.outlinedBorder', pl: 2 }}>
          <Typography level="title-sm">{it.label}</Typography>
          {it.timestamp && (
            <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>{it.timestamp}</Typography>
          )}
          {it.description && <Typography level="body-sm">{it.description}</Typography>}
        </Box>
      ))}
    </Box>
  )
}



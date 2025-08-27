'use client'

import React from 'react'
import Chip from '@mui/joy/Chip'
import Box from '@mui/joy/Box'

export interface DynamicChipsProps {
  chips: { label: string; color?: string }[]
}

export const DynamicChips: React.FC<DynamicChipsProps> = ({ chips }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {chips.map((c, idx) => (
        <Chip key={idx} color={(c.color as any) ?? 'neutral'} variant="soft">
          {c.label}
        </Chip>
      ))}
    </Box>
  )
}



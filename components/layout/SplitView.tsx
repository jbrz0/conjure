'use client'

import React from 'react'
import Box from '@mui/joy/Box'

export interface SplitViewProps { left: string; right: string; ratio?: number }

export const SplitView: React.FC<SplitViewProps> = ({ left, right, ratio = 0.5 }) => {
  const leftPct = Math.round(ratio * 100)
  const rightPct = 100 - leftPct
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flexBasis: `${leftPct}%`, flexGrow: 0, flexShrink: 0 }}>{left}</Box>
      <Box sx={{ flexBasis: `${rightPct}%`, flexGrow: 0, flexShrink: 0 }}>{right}</Box>
    </Box>
  )
}



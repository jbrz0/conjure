'use client'

import React from 'react'
import Box from '@mui/joy/Box'
import LinearProgress from '@mui/joy/LinearProgress'
import Typography from '@mui/joy/Typography'

export interface GaugeProps { value: number; min?: number; max?: number }

export const Gauge: React.FC<GaugeProps> = ({ value, min = 0, max = 100 }) => {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <Box>
      <Typography level="body-sm" sx={{ mb: 0.5 }}>Gauge: {Math.round(pct)}%</Typography>
      <LinearProgress determinate value={pct} />
    </Box>
  )
}



'use client'

import React from 'react'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export interface HeatmapProps {
  values: number[][]
  rowLabels?: string[]
  colLabels?: string[]
}

const colorFor = (v: number) => {
  const clamped = Math.max(0, Math.min(1, v))
  const r = Math.round(255 * clamped)
  const b = Math.round(255 * (1 - clamped))
  return `rgb(${r}, 80, ${b})`
}

export const Heatmap: React.FC<HeatmapProps> = ({ values, rowLabels, colLabels }) => {
  const rows = values.length
  const cols = values[0]?.length ?? 0
  return (
    <Box>
      {colLabels && (
        <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 24px)`, gap: 0.5, mb: 0.5 }}>
          {colLabels.map((c, i) => (
            <Typography key={i} level="body-xs" sx={{ textAlign: 'center' }}>{c}</Typography>
          ))}
        </Box>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 24px)`, gap: 0.5 }}>
        {values.flat().map((v, idx) => (
          <div key={idx} style={{ width: 24, height: 24, background: colorFor(v), borderRadius: 3 }} />
        ))}
      </Box>
      {rowLabels && (
        <Typography level="body-xs" sx={{ mt: 0.5, color: 'text.tertiary' }}>{rows} rows</Typography>
      )}
    </Box>
  )
}



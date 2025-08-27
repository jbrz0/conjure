'use client'

import React from 'react'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'

export interface StatGridProps { items: { label: string; value: string | number }[]; columns?: number }

export const StatGrid: React.FC<StatGridProps> = ({ items, columns = 3 }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 2 }}>
      {items.map((it, idx) => (
        <Card key={idx} variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
          <Typography level="h3">{it.value}</Typography>
          <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>{it.label}</Typography>
        </Card>
      ))}
    </Box>
  )
}



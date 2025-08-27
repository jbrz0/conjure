'use client'

import React from 'react'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'

export interface CardGridProps { items: { title: string; body: string }[]; columns?: number }

export const CardGrid: React.FC<CardGridProps> = ({ items, columns = 3 }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 2 }}>
      {items.map((it, idx) => (
        <Card key={idx} variant="outlined">
          <Typography level="title-md">{it.title}</Typography>
          <Typography level="body-sm">{it.body}</Typography>
        </Card>
      ))}
    </Box>
  )
}



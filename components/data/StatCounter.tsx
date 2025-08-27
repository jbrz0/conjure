'use client'

import React from 'react'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'

export interface StatCounterProps { value: number; label?: string; suffix?: string }

export const StatCounter: React.FC<StatCounterProps> = ({ value, label, suffix }) => {
  return (
    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
      {label && <Typography level="title-sm" sx={{ mb: 0.5 }}>{label}</Typography>}
      <Typography level="h1" sx={{ fontWeight: 'lg' }}>
        {value}
        {suffix}
      </Typography>
    </Card>
  )
}



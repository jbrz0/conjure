'use client'

import React from 'react'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

export interface KPICardProps { title: string; value: string | number; change?: number }

export const KPICard: React.FC<KPICardProps> = ({ title, value, change }) => {
  const changeColor = change === undefined ? 'neutral' : change >= 0 ? 'success' : 'danger'
  const changeText = change === undefined ? '' : `${change > 0 ? '+' : ''}${change}%`
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Typography level="title-sm" sx={{ mb: 0.5 }}>{title}</Typography>
      <Typography level="h2">{value}</Typography>
      {change !== undefined && (
        <Typography level="body-sm" color={changeColor as any}>{changeText}</Typography>
      )}
    </Card>
  )
}



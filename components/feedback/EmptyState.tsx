'use client'

import React from 'react'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'

export interface EmptyStateProps { title: string; description?: string }

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
      <Typography level="title-lg" sx={{ mb: 0.5 }}>{title}</Typography>
      {description && <Typography level="body-sm" color="neutral">{description}</Typography>}
    </Card>
  )
}



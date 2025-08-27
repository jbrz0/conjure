'use client'

import React from 'react'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import Box from '@mui/joy/Box'

export interface HeroProps { title: string; subtitle?: string; cta?: { label: string; href?: string } }

export const Hero: React.FC<HeroProps> = ({ title, subtitle, cta }) => {
  return (
    <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'background.level1', borderRadius: 8 }}>
      <Typography level="h2" sx={{ mb: 1 }}>{title}</Typography>
      {subtitle && <Typography level="body-lg" sx={{ mb: 2, color: 'text.tertiary' }}>{subtitle}</Typography>}
      {cta && (
        <Button component={cta.href ? 'a' : 'button'} href={cta.href}>{cta.label}</Button>
      )}
    </Box>
  )
}



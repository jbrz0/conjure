'use client'

import React from 'react'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export interface DynamicAvatarListProps {
  avatars: { name: string; src?: string }[]
}

export const DynamicAvatarList: React.FC<DynamicAvatarListProps> = ({ avatars }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      {avatars.map((a, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={a.src} alt={a.name}>{a.name.charAt(0)}</Avatar>
          <Typography level="body-sm">{a.name}</Typography>
        </Box>
      ))}
    </Box>
  )
}



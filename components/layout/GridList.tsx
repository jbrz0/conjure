'use client'

import React from 'react'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Typography from '@mui/joy/Typography'
import CheckIcon from '@mui/icons-material/Check'

export interface GridListProps { items: { title: string; subtitle?: string }[] }

export const GridList: React.FC<GridListProps> = ({ items }) => {
  return (
    <List>
      {items.map((it, idx) => (
        <ListItem key={idx}>
          <ListItemDecorator>
            <CheckIcon fontSize="small" />
          </ListItemDecorator>
          <div>
            <Typography level="body-md">{it.title}</Typography>
            {it.subtitle && <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>{it.subtitle}</Typography>}
          </div>
        </ListItem>
      ))}
    </List>
  )
}



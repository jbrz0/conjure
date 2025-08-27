'use client'

import React from 'react'
import Box from '@mui/joy/Box'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import CheckIcon from '@mui/icons-material/Check'

export interface DynamicListProps {
  items: string[]
  ordered?: boolean
}

export const DynamicList: React.FC<DynamicListProps> = ({ items, ordered }) => {
  if (ordered) {
    return (
      <Box sx={{ pl: 2 }}>
        <ol>
          {items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ol>
      </Box>
    )
  }
  return (
    <List>
      {items.map((it, idx) => (
        <ListItem key={idx}>
          <ListItemDecorator>
            <CheckIcon fontSize="small" />
          </ListItemDecorator>
          {it}
        </ListItem>
      ))}
    </List>
  )
}



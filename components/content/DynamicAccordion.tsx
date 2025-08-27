'use client'

import React from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup'
import Accordion from '@mui/joy/Accordion'
import AccordionSummary from '@mui/joy/AccordionSummary'
import AccordionDetails from '@mui/joy/AccordionDetails'
import Typography from '@mui/joy/Typography'

export interface DynamicAccordionProps {
  items: { title: string; content: string }[]
}

export const DynamicAccordion: React.FC<DynamicAccordionProps> = ({ items }) => {
  return (
    <AccordionGroup>
      {items.map((it, idx) => (
        <Accordion key={idx}>
          <AccordionSummary>
            <Typography level="title-sm">{it.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography level="body-sm">{it.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionGroup>
  )
}



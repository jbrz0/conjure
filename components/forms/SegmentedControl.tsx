'use client'

import React, { useState } from 'react'
import Button from '@mui/joy/Button'
import ButtonGroup from '@mui/joy/ButtonGroup'

export interface SegmentedControlProps { options: string[]; value?: string }

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value }) => {
  const [val, setVal] = useState<string>(value ?? options[0])
  return (
    <ButtonGroup>
      {options.map((opt) => (
        <Button key={opt} variant={val === opt ? 'solid' : 'outlined'} onClick={() => setVal(opt)}>
          {opt}
        </Button>
      ))}
    </ButtonGroup>
  )
}



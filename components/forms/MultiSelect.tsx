'use client'

import React, { useState } from 'react'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Typography from '@mui/joy/Typography'

export interface MultiSelectProps { label?: string; options: string[]; values?: string[] }

export const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, values = [] }) => {
  const [val, setVal] = useState<string[]>(values)
  return (
    <div>
      {label && <Typography level="body-sm" sx={{ mb: 0.5 }}>{label}</Typography>}
      <Select multiple value={val} onChange={(_, v) => setVal(v as string[])}>
        {options.map((o) => (
          <Option key={o} value={o}>{o}</Option>
        ))}
      </Select>
    </div>
  )
}



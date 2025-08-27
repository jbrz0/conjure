'use client'

import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import TextField from '@mui/joy/Input'

export interface DateTimePickerInputProps { label?: string; value?: string }

export const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({ label, value }) => {
  const [val, setVal] = useState<any>(value ? (window as any).dayjs?.(value) ?? null : null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={val}
        onChange={(v) => setVal(v)}
      />
    </LocalizationProvider>
  )
}



'use client'

import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

export interface CalendarViewProps { selectedDate?: string }

export const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate }) => {
  const [value, setValue] = useState<any>(selectedDate ? (window as any).dayjs?.(selectedDate) ?? null : null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} onChange={(v) => setValue(v)} />
    </LocalizationProvider>
  )
}



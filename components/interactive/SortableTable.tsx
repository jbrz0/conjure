'use client'

import React, { useState } from 'react'
import Table from '@mui/joy/Table'

export interface SortableTableProps { headers: string[]; rows: string[][] }

export const SortableTable: React.FC<SortableTableProps> = ({ headers, rows }) => {
  const [sortIndex, setSortIndex] = useState<number | null>(null)
  const [asc, setAsc] = useState(true)
  const sorted = [...rows].sort((a, b) => {
    if (sortIndex === null) return 0
    const av = a[sortIndex] ?? ''
    const bv = b[sortIndex] ?? ''
    return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
  })
  return (
    <Table variant="outlined" size="sm" borderAxis="bothBetween">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ cursor: 'pointer' }} onClick={() => { setAsc(i === sortIndex ? !asc : true); setSortIndex(i) }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, cidx) => (
              <td key={cidx}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}



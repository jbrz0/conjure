'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const CommandK = dynamic(() => import('cmdk').then(m => m.Command as any), { ssr: false }) as any

export interface CommandPaletteProps { commands: { id: string; title: string }[] }

export const CommandPalette: React.FC<CommandPaletteProps> = ({ commands }) => {
  const [open, setOpen] = useState(true)
  const [filter, setFilter] = useState('')
  return (
    <div>
      <CommandK label="Command Menu" shouldFilter={false} onValueChange={(v: string) => setFilter(v)}>
        <input placeholder="Type a command..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        <div>
          {commands.filter(c => c.title.toLowerCase().includes(filter.toLowerCase())).map(c => (
            <div key={c.id} role="option">{c.title}</div>
          ))}
        </div>
      </CommandK>
    </div>
  )
}



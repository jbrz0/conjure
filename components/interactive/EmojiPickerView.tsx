'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Picker = dynamic(() => import('emoji-mart').then(m => m.Picker as any), { ssr: false }) as any

export const EmojiPickerView: React.FC = () => {
  const [chosen, setChosen] = useState<any>(null)
  return (
    <div>
      <Picker onEmojiSelect={(e: any) => setChosen(e)} />
      {chosen && <div style={{ marginTop: 8 }}>Selected: {chosen.native || chosen.shortcodes}</div>}
    </div>
  )
}



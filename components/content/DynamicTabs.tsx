'use client'

import React, { useState } from 'react'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'

export interface DynamicTabsProps {
  tabs: { label: string; content: string }[]
}

export const DynamicTabs: React.FC<DynamicTabsProps> = ({ tabs }) => {
  const [value, setValue] = useState<number | string>(0)
  return (
    <Tabs value={value} onChange={(_, v) => v !== null && setValue(v)}>
      <TabList>
        {tabs.map((t, idx) => (
          <Tab key={idx} value={idx}>{t.label}</Tab>
        ))}
      </TabList>
      {tabs.map((t, idx) => (
        <TabPanel key={idx} value={idx}>
          {t.content}
        </TabPanel>
      ))}
    </Tabs>
  )
}



'use client'

import React, { useState } from 'react'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Stepper from '@mui/joy/Stepper'
import Step, { stepClasses } from '@mui/joy/Step'
import StepIndicator from '@mui/joy/StepIndicator'

export interface DynamicStepperTabsProps {
  steps: { label: string; content: string }[]
}

export const DynamicStepperTabs: React.FC<DynamicStepperTabsProps> = ({ steps }) => {
  const [value, setValue] = useState<number | string>(0)
  return (
    <>
      <Stepper sx={{ '--StepIndicator-size': '24px', mb: 1 }}>
        {steps.map((s, idx) => (
          <Step key={idx} sx={{ [`& .${stepClasses.indicator}`]: { cursor: 'pointer' } }} onClick={() => setValue(idx)}>
            <StepIndicator variant={value === idx ? 'solid' : 'outlined'}>{idx + 1}</StepIndicator>
          </Step>
        ))}
      </Stepper>
      <Tabs value={value} onChange={(_, v) => v !== null && setValue(v)}>
        <TabList sx={{ display: 'none' }}>
          {steps.map((s, idx) => (
            <Tab key={idx} value={idx}>{s.label}</Tab>
          ))}
        </TabList>
        {steps.map((s, idx) => (
          <TabPanel key={idx} value={idx}>
            {s.content}
          </TabPanel>
        ))}
      </Tabs>
    </>
  )
}



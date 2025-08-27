'use client'

import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

export interface SparklineProps { data: number[]; width?: number; height?: number }

export const Sparkline: React.FC<SparklineProps> = ({ data, width = 240, height = 80 }) => {
  return (
    <LineChart
      width={width}
      height={height}
      series={[{ data, showMark: false }]}
      xAxis={[{ scaleType: 'point', data: data.map((_, i) => i) }]}
      grid={{ vertical: false, horizontal: false }}
    />
  )
}



'use client'

import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

export interface TimelinePoint { t: string | number; v: number }
export interface TimelineChartProps { points: TimelinePoint[]; width?: number; height?: number }

export const TimelineChart: React.FC<TimelineChartProps> = ({ points, width = 400, height = 240 }) => {
  const xs = points.map((p) => p.t)
  const ys = points.map((p) => p.v)
  return <LineChart width={width} height={height} series={[{ data: ys }]} xAxis={[{ scaleType: 'point', data: xs }]} />
}



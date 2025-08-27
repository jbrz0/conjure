'use client'

import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// Define a type for our data points
interface DataPoint {
  label: string;
  value: number;
}

// Define the props for our chart component
export interface DynamicChartProps {
  data: DataPoint[];
  width: number;
  height: number;
}

export const DynamicChart: React.FC<DynamicChartProps> = ({ data, width, height }) => {
  const chartData = data.map(d => d.value);
  const xAxisData = data.map(d => d.label);

  return (
    <BarChart
      width={width}
      height={height}
      series={[{ data: chartData }]}
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
    />
  );
};

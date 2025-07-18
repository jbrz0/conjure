'use client'

import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

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
  margin?: { top: number; right: number; bottom: number; left: number };
}

const defaultMargin = { top: 20, right: 20, bottom: 40, left: 40 };

export const DynamicChart: React.FC<DynamicChartProps> = ({
  data,
  width,
  height,
  margin = defaultMargin,
}) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleBand<string>({
    range: [0, xMax],
    round: true,
    domain: data.map(d => d.label),
    padding: 0.4,
  });

  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(d => d.value))],
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <AxisBottom top={yMax} scale={xScale} stroke="#ffffff" tickStroke="#ffffff" tickLabelProps={() => ({ fill: '#ffffff', fontSize: 11, textAnchor: 'middle' })} />
        <AxisLeft scale={yScale} stroke="#ffffff" tickStroke="#ffffff" tickLabelProps={() => ({ fill: '#ffffff', fontSize: 11, textAnchor: 'end' })} />
        {data.map(d => {
          const barHeight = yMax - (yScale(d.value) ?? 0);
          return (
            <Bar
              key={`bar-${d.label}`}
              x={xScale(d.label)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#2965CC"
            />
          );
        })}
      </Group>
    </svg>
  );
};

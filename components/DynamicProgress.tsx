'use client'

import React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

interface DynamicProgressProps {
  value: number;
  max?: number;
  label?: string;
}

export const DynamicProgress: React.FC<DynamicProgressProps> = ({ value, max = 100, label }) => {
  const progressValue = (value / max) * 100;

  return (
    <Box sx={{ p: 2 }}>
      {label && <Typography level="title-md" sx={{ mb: 1 }}>{label}</Typography>}
      <LinearProgress determinate value={progressValue} />
    </Box>
  );
};

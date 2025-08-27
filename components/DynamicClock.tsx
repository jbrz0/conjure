'use client'

import React, { useState, useEffect } from 'react';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';

interface DynamicClockProps {
  label?: string;
  timezone?: string;
}

export const DynamicClock: React.FC<DynamicClockProps> = ({ label, timezone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formatTime = () => {
    try {
      return time.toLocaleTimeString('en-US', { timeZone: timezone });
    } catch (error) {
      console.error('Invalid timezone:', timezone);
      return 'Invalid Timezone';
    }
  };

  return (
    <Card variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box textAlign="center">
        {label && <Typography level="title-md">{label}</Typography>}
        <Typography level="h2" sx={{ fontFamily: 'monospace' }}>
          {formatTime()}
        </Typography>
      </Box>
    </Card>
  );
};

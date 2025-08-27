'use client'

import React from 'react';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

interface DynamicAlertProps {
  title?: string;
  content: string;
  severity: 'info' | 'warning' | 'success' | 'danger';
}

export const DynamicAlert: React.FC<DynamicAlertProps> = ({ title, content, severity }) => {
  const color = severity === 'info' ? 'neutral' : severity;

  return (
    <Box sx={{ p: 2 }}>
      <Alert color={color} variant="soft">
        {title && <Typography level="title-md">{title}</Typography>}
        <Typography level="body-sm">{content}</Typography>
      </Alert>
    </Box>
  );
};

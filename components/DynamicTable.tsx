'use client'

import React from 'react';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

export interface DynamicTableProps {
  headers: string[];
  rows: Array<Array<string | number | boolean>>;
  caption?: string;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({ headers, rows, caption }) => {
  return (
    <Box>
      {caption && (
        <Typography level="title-md" sx={{ mb: 1 }}>
          {caption}
        </Typography>
      )}
      <Table variant="outlined" size="sm" borderAxis="bothBetween">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cidx) => (
                <td key={cidx}>{String(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};



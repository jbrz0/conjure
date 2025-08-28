'use client'

import React from 'react'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: '#0b1020',
          surface: '#11162a',
          popup: '#0f1430',
          level1: '#11162a',
          level2: '#0d1226',
        },
        primary: {
          50: '#E6FDFF',
          100: '#BFF8FF',
          200: '#80F0FF',
          300: '#40E8FF',
          400: '#0FE1FF',
          500: '#00D5F5', // neon cyan
          600: '#00B8D4',
          700: '#009DB5',
          800: '#008095',
          900: '#006276',
          solidBg: '#00D5F5',
          solidHoverBg: '#0FE1FF',
          plainColor: '#40E8FF',
        },
        success: { solidBg: '#00e676' },
        warning: { solidBg: '#ffd54f' },
        danger: { solidBg: '#ff1744' },
        neutral: {
          outlinedBorder: '#232b46',
        },
      },
    },
  },
  fontFamily: {
    display: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial',
  },
  radius: {
    md: '12px',
    lg: '16px',
  },
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider defaultMode="dark" theme={theme}>
      {children}
    </CssVarsProvider>
  )
}



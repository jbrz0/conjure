import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Conjure - AI-Powered Dynamic Responses',
  description: 'Experience AI that creates interactive, dynamic content tailored to your needs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="bp5-dark">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

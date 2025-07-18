import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/datetime2/lib/css/blueprint-datetime2.css'
import './globals.css'

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
        <div className="bp5-dark">
          {children}
        </div>
      </body>
    </html>
  )
}

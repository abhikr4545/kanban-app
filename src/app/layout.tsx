import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { BoardProvider } from '@/context/BoardContext'
import { ColumnProvider } from '@/context/ColumnContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban App',
  description: 'A kanban app with drag and drop feature.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BoardProvider>
      <ColumnProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </ColumnProvider>
    </BoardProvider>
  )
}

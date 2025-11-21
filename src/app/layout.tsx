'use client'

import './globals.css'
import './nprogress.css'
import { MobileNav } from '@/components/layout/MobileNav'
import { LoadingProvider } from '@/components/LoadingProvider'
import { ToastProvider } from '@/components/ToastProvider'
import { NavigationProgress } from '@/components/NavigationProgress'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="overflow-x-hidden max-w-full">
        <LoadingProvider>
          <NavigationProgress />
          <ToastProvider />
          <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden max-w-full">
            {children}
            <MobileNav />
          </main>
        </LoadingProvider>
      </body>
    </html>
  )
}

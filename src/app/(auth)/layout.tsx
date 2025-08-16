import { Metadata } from 'next'
import React from 'react'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Lotus | Authentication',
  description: 'Lottery app',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="max-w-7xl min-h-screen mx-auto flex flex-col items-center justify-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

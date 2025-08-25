import React from 'react'
import '@/app/globals.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="max-w-7xl min-h-screen mx-auto flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  )
}

import { Metadata } from 'next'
import { Michroma } from 'next/font/google'
import React from 'react'
import '@/app/globals.css'
import { ToastrProvider } from "@/providers"
import { AppStateProvider } from "@/providers/state-provider"
import { Dropdown } from "@/components"

export const metadata: Metadata = {
  title: 'Lotus',
  description: 'Lottery app',
}

const michroma = Michroma({
  weight: ["400"],
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${michroma.className} text-xs`}>
        <AppStateProvider>
          {children}
          <ToastrProvider />
          <Dropdown />
        </AppStateProvider>
      </body>
    </html>
  )
}

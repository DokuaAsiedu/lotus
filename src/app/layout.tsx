import { Metadata } from 'next'
import { Michroma } from 'next/font/google'
import React from 'react'
import '@/app/globals.css'
import { ToastrProvider } from "@/providers"

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
      <body className={`${michroma.className} text-[0.8rem]`}>
        {children}
        <ToastrProvider />
      </body>
    </html>
  )
}

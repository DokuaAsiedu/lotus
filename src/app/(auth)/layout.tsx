import { Metadata } from 'next'
import { Michroma } from 'next/font/google'
import React from 'react'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Lotus | Authentication',
  description: 'Lottery app',
}

const michroma = Michroma({
  weight: ["400"],
  subsets: ['latin'],
})

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${michroma.className} text-[0.8rem]`}>
        <main>
          <div className="max-w-7xl min-h-screen mx-auto flex flex-col items-center justify-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import '@/app/globals.css'
import { Navbar, MenuBar } from '@/components'
import { Michroma } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Lotus',
  description: 'Lottery app',
}

const michroma = Michroma({
  weight: ["400"],
  subsets: ['latin'],
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${michroma.className} max-w-7xl min-h-screen mx-auto flex flex-col`}>
        <header>
          <Navbar />
          <MenuBar />
        </header>
        <main>
          <div className="flex flex-col items-center justify-center">{children}</div>
        </main>
      </body>
    </html>
  )
}

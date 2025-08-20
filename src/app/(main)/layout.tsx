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
      <body className={`${michroma.className} max-w-9xl w-full min-h-screen mx-auto flex flex-col`}>
        <header>
          <div className="px-12 py-4">
            <Navbar />
          </div>
          <hr />
          <div className="px-12 py-4">
            <MenuBar />
          </div>
          <hr />
        </header>
        <main>
          <div className="px-12 py-4 flex flex-col items-center justify-center">{children}</div>
        </main>
      </body>
    </html>
  )
}

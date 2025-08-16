import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Lotus',
  description: 'Lottery app',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="max-w-7xl min-h-screen mx-auto flex flex-col items-center justify-center">{children}</div>
        </main>
      </body>
    </html>
  )
}

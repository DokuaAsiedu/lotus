import '@/app/globals.css'
import { Navbar, MenuBar } from '@/components'
import { Michroma } from 'next/font/google'

const michroma = Michroma({
  weight: ["400"],
  subsets: ['latin'],
})

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${michroma.className} max-w-[12xl] w-full min-h-screen mx-auto flex flex-col`}>
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
    </div>
  )
}

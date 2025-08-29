import '@/app/globals.css'
import { Navbar, MenuBar } from '@/components'
import MenuBarWrapper from "@/components/general"
import { Michroma } from 'next/font/google'

const michroma = Michroma({
  weight: ["400"],
  subsets: ['latin'],
})

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${michroma.className} w-full mx-auto flex flex-col`}>
      <header className="sticky top-0 bg-white z-50">
        <div className="mx-auto max-w-10xl px-12 py-4">
          <Navbar />
        </div>
        <hr />
        <MenuBarWrapper>
          <div className="mx-auto max-w-10xl px-12 py-4">
            <MenuBar />
          </div>
          <hr />
        </MenuBarWrapper>
      </header>
      <main className="h-[1000px]">
        <div className="h-full min-w-[750px] max-w-10xl px-12 py-4 mx-auto flex flex-col items-center ">
          {children}
        </div>
      </main>
    </div>
  )
}

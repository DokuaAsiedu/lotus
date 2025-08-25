'use client'

import { routes } from '@/lib'
import Image from 'next/image'
import Link from 'next/link'
import { Golos_Text, Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const golosText = Golos_Text({
  weight: ['400', '500', '800'],
  subsets: ['latin'],
})

const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

export function Navbar() {
  const pathname = usePathname()
  const [showSideMenu, setShowSideMenu] = useState(false)

  function handleSideMenu(toggle: boolean) {
    setShowSideMenu(toggle)
  }

  return (
    <div className={`${golosText.className}`}>
      {/* Mobile Menu */}
      <div className="flex items-center justify-between lg:hidden">
        <div>
          <Image src="/icon.png" alt="app icon" width={100} height={2} />
        </div>
        <button className="p-2 cursor-pointer" onClick={() => handleSideMenu(true)}>
          <Image src="/icons/burger-menu.png" alt="burger menu icon" width={20} height={20} />
        </button>
        {showSideMenu && (
          <div className="h-full w-full fixed top-0 right-0">
            <div className="absolute w-full h-full z-[99] backdrop-blur-xs" onClick={() => handleSideMenu(false)}></div>
            <div className="absolute top-0 right-0 z-[100] min-w-72 max-w-xl w-1/2 h-full p-4 flex flex-col gap-2 bg-white shadow-2xl">
              <button
                className="self-end p-2 flex items-center justify-center cursor-pointer"
                onClick={() => handleSideMenu(false)}
              >
                <Image src="/icons/close.png" alt="close icon" width={20} height={20} />
              </button>
              {/* <div className="flex flex-col gap-4">
                <button
                  type="button"
                  className="self-start p-0.5 border-2 border-brandeis-blue rounded-full cursor-pointer"
                >
                  <Image src="/avatar.png" alt="gear icon" width={35} height={35} className="aspect-square" />
                </button>
                <div className="flex items-stretch gap-2">
                  <input
                    type="search"
                    className={`${inter.className} grow px-4 py-2 focus:outline-0 border-2 border-light-gray rounded-md`}
                    placeholder="Search..."
                  />
                  <button
                    type="button"
                    className="px-2 aspect-square border-2 border-light-gray rounded-md cursor-pointer"
                  >
                    <Image
                      src="/icons/magnifying-glass.png"
                      alt="magnifying glass"
                      width={10}
                      height={10}
                      className="aspect-square"
                    />
                  </button>
                </div>
                <button type="button" className="flex items-center gap-2 py-2 cursor-pointer">
                  <Image src="/icons/gear.png" alt="gear icon" width={20} height={20} className="aspect-square" />
                  <span>Settings</span>
                </button>
              </div> */}
              <nav className="flex flex-col gap-6">
                {routes.map((item, index) => {
                  return (
                    <Link
                      key={`item-${index}`}
                      href={item.path}
                      className={`link ${pathname === item.path ? 'font-extrabold' : 'font-medium'}`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Desktop menu */}
      <div className="max-lg:hidden flex items-center justify-between">
        <div>
          <Image src="/icon.png" alt="app icon" width={200} height={2} />
        </div>
        <nav className="flex items-center gap-6">
          {routes.map((item, index) => {
            return (
              <React.Fragment key={`item-${index}`}>
                <Link href={item.path} className={`link ${pathname === item.path ? 'font-extrabold' : 'font-medium'}`}>
                  {item.name}
                </Link>
                {index === 3 && <span>|</span>}
              </React.Fragment>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex items-stretch gap-2">
            <input
              type="search"
              className={`${inter.className} text-xs`}
              placeholder="Enter Search..."
            />
            <button type="button" className="aspect-square grid place-items-center px-2 border-2 border-light-gray rounded-md">
              <Image
                src="/icons/magnifying-glass.png"
                alt="magnifying glass"
                width={15}
                height={15}
              />
            </button>
          </div>
          <button type="button" className="p-2">
            <Image src="/icons/gear.png" alt="gear icon" width={20} height={20} />
          </button>
          <button type="button" className="p-0.5 border-2 border-brandeis-blue rounded-full cursor-pointer">
            <Image src="/avatar.png" alt="gear icon" width={35} height={35} className="aspect-square" />
          </button>
        </div>
      </div>
    </div>
  )
}

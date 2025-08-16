import Image from 'next/image'
import React from 'react'
import { Jura, Inter, Montserrat } from 'next/font/google'

const jura = Jura({
  weight: ['700'],
  subsets: ['latin'],
})

const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export function Summary() {
  return (
    <div className="flex items-stretch gap-4 text-smokey-gray">
      <div className="self-stretch aspect-square flex items-center justify-center">
        <Image src="/icons/qr-code.png" alt="qr code" height={30} width={30} />
      </div>
      <div className={`${montserrat.className} flex flex-col text-xs`}>
        <span className="font-bold text-smokey-gray">Today&apos;s total sales</span>
        <span className={`${jura.className} font-bold text-base text-black`}>GHS 34,187,663.00</span>
        <p>from <span className="font-bold">13,084 players</span> and <span className="font-bold">17,896 stakes</span></p>
      </div>
      <div className="flex items-center gap-2">
        <input type="search" placeholder="Search" className={`${inter.className} text-black`} />
        <button type="button" className="px-2 aspect-square border-2 border-light-gray rounded-md cursor-pointer">
          <Image
            src="/icons/magnifying-glass.png"
            alt="magnifying glass"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  )
}

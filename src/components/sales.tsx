import Image from 'next/image'
import React from 'react'
import { Jura, Inter, Montserrat, Golos_Text } from 'next/font/google'

const jura = Jura({
  weight: ['700'],
  subsets: ['latin'],
})

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const golosText = Golos_Text({
  weight: ['400', '600', '700'],
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

export function Tickets() {
  return (
    <div className={`${inter.className} flex flex-col`}>
      <div className="p-6 grid grid-cols-9 gap-4 font-bold text-sm">
        <div className="col-span-2">Tickets #</div>
        <div className="col-span-1">Play</div>
        <div className="col-span-3">Stakes</div>
        <div className="col-span-3">Retailers</div>
      </div>
      {Array.from({ length: 10 }, (_, index) => {
        return (
          <div key={`index-${index}`} className="p-6 grid grid-cols-9 gap-4 items-center text-sm border-t-1 border-t-light-gray">
            <div className="col-span-2 flex flex-col">
              <span>1024-1034589</span>
              <span className={`text-smokey-gray text-xs ${montserrat.className}`}>Mac 5 Original</span>
            </div>
            <div className="col-span-1">Direct 5</div>
            <div className="col-span-3 flex gap-2">
              {[44, 33, 89, 21, 7].map((item, index) => {
                return (
                  <div key={`index-${index}`} className="grow grid place-items-center border-1 border-light-gray rounded-md">{item}</div>
                )
              })}
            </div>
            <div className="col-span-3 flex items-center gap-3">
              <div className="grid place-items-center">
                <Image src="/avatar-sheena.png" alt="qr code" height={30} width={30} />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <span>Sheena Osei</span>
                <span className="text-smokey-gray">+233 (0)24 567 8901</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Retailers() {
  return (
    <div className="flex flex-col justify-stretch">
      <div className={`${montserrat.className} px-6 py-4 flex items-center justify-between`}>
        <div className="flex flex-col justify-center gap-1">
          <span className={`${golosText.className} font-semibold`}>Retailers</span>
          <span className="text-smokey-gray font-bold">365</span>
        </div>
        <div className="flex items-center gap-2 border-t-0 border-b-1 border-b-light-gray">
          <input type="search" className="border-0!" placeholder="Enter phone number or name" />
          <button type="button" className="px-2 aspect-square">
            <Image
              src="/icons/magnifying-glass.png"
              alt="magnifying glass"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div className="px-8 py-4 flex flex-col items-end gap-1 bg-[#81DFF7] font-bold">
        <span className={`${montserrat.className} text-smokey-gray text-xs`}>Total Retailers Float</span>
        <span className={`${jura.className} text-lg`}>GHS 129,348.00</span>
      </div>
      <div className="flex flex-col">
        <div className={`${inter.className} p-6 grid grid-cols-6 gap-4 font-bold text-sm bg-light-gray`}>
          <div className="col-span-3">Retailer</div>
          <div className="col-span-2">Sales</div>
          <div className="col-span-1">Stake #</div>
        </div>
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <div key={`index-${index}`} className="p-6 grid grid-cols-6 gap-4 items-center text-sm border-t-1 border-t-light-gray hover:bg-light-gray">
              <div className="col-span-3 flex items-center gap-3">
                <div className="grid place-items-center">
                  <Image src="/avatar-sheena.png" alt="qr code" height={30} width={30} />
                </div>
                <div className={`${montserrat.className} flex flex-col justify-center gap-1`}>
                  <span>Sheena Osei</span>
                  <span className="text-smokey-gray">+233 (0)24 567 8901</span>
                </div>
              </div>
              <div className={`${jura.className} col-span-2`}>GHS 3,012.00</div>
              <div className={`${inter.className} col-span-1`}>14</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

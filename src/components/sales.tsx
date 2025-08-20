import Image from 'next/image'
import React from 'react'
import { Jura, Inter, Montserrat, Golos_Text } from 'next/font/google'

const jura = Jura({
  weight: ['700'],
  subsets: ['latin'],
})

const inter = Inter({
  weight: ['400', '600', '700'],
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
      <div className={`${montserrat.className} px-6 py-4 flex items-center justify-between border-b-1 border-b-light-gray`}>
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
      <div className="px-8 py-4 flex flex-col items-end gap-1 font-bold">
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
            <div key={`index-${index}`} className="p-6 grid grid-cols-6 gap-4 items-center text-sm even:bg-white-smoke">
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

export function Winnings() {
  return (
    <div>
      <div className="px-6 py-4 flex flex-col gap-2 border-b-1 border-b-light-gray">
        <div className="grid grid-cols-2">
          <div className={`${golosText.className} flex flex-col justify-between gap-4`}>
            <h2 className="font-semibold text-xl">Winnings</h2>
            <p className="font-bold text-smokey-gray text-xs">Game</p>
          </div>
          <div className={`${montserrat.className} text-smokey-gray`}>
            <span className="text-xs font-bold">Draw Date</span>
            <div className="p-2 flex gap-2 border-light-gray border-1 rounded-sm text-black">
              <span>02/04/2025 |</span>
              <div className="h-full aspect-square grid place-items-center">
                <Image src="/icons/calendar.png" alt="calendaricon" height={5} width={5} layout="responsive" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${montserrat.className} flex items-center justify-between`}>
          <span className="font-normal">5/90 Original +</span>
          <p className="text-xs font-bold text-end text-smokey-gray">
            Event #: <span className="text-black">91023</span>
          </p>
        </div>
      </div>
      <div className={`${montserrat.className} px-6 py-4 flex items-center gap-4 border-b-1 border-b-light-gray`}>
        <span className="font-bold">5/90 Original:</span>
        <div className="grow flex gap-2">
          {[44, 33, 89, 21, 7].map((item, index) => {
            return (
              <div key={`index-${index}`} className={`${inter.className} grow w-full grid place-items-center aspect-square bg-black text-white rounded-sm font-semibold`}>{item}</div>
            )
          })}
        </div>
      </div>
      <div className="px-6">
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <div key={`index-${index}`} className="py-4 grid grid-cols-2 gap-2 border-b-1 border-b-[#E0E0E0]">
              <div className="flex flex-col gap-2">
                <div className="col-span-1 flex gap-2">
                  {[44, 33, 89, 21, 7].map((item, index) => {
                    return (
                      <div key={`elem-${index}`} className={`${inter.className} grid place-items-center aspect-square rounded-sm border-1 border-light-gray font-semibold`}>{item}</div>
                    )
                  })}
                </div>
                <p className={`${montserrat.className} text-xs text-smokey-gray`}>Perm 3 | 5/90 Original</p>
              </div>
              <div className="col-span-1 flex flex-col items-end justify-between">
                <span className={`${jura.className} text-end`}>GHS 3,012.00</span>
                <span className={`${montserrat.className} text-smokey-gray text-xs`}>+233 (0)24 567 8901</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

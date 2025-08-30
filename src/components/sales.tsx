"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Jura, Inter, Montserrat, Golos_Text } from 'next/font/google'
import { formatDateString, formatPhoneNumber, getFormattedDate } from "@/lib/helpers"
import { EventResult, RetailerSummary, SalesResponse, Stake, TicketResponse } from "@/types"
import { Placeholder, Spinner } from "./general"
import profileAvatar from "@public/avatar-sheena.png"
import calendarIcon from "@public/icons/calendar.png"
import magnifyingGlassIcon from "@public/icons/magnifying-glass.png"
import qrCodeIcon from "@public/icons/qr-code.png"
import { useAppState } from "@/providers/state-provider"

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

const pendingClasses = "bg-zinc-200 text-transparent animate-pulse";

export function Summary() {
  const [pending, setPending] = useState(true)
  const [summary, setSummary] = useState<SalesResponse | null>(null);
  const {selectedGames} = useAppState()

  async function fetchData() {
    const today = getFormattedDate(new Date())
    setPending(true);
    try {
      const gameIds = selectedGames.map((item) => `gameId[]=${item.id}`).join("&")
      const url = `/api/sales?startDate=${today}&endDate=${today}&${gameIds}`
      const response = await fetch(url);
      const res = await response.json()
      setSummary(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedGames])

  return (
    <div className="flex items-center gap-4 text-smokey-gray">
      <div className="self-stretch aspect-square flex items-center justify-center">
        <Image src={qrCodeIcon} alt="qr code" height={100} width={100} className="w-24" />
      </div>
      <div className={`${montserrat.className} flex flex-col`}>
        <span className="font-bold text-smokey-gray">Today&apos;s total sales</span>
        <span className={`${jura.className} font-bold text-black main-number-font ${pending ? pendingClasses : ""}`}>{summary?.total ?? "0"}</span>
        <p className="">from <span className={`font-bold ${pending ? pendingClasses : ""}`}>{summary?.totalRetailClients ?? "0"} players</span> and <span className={`font-bold ${pending ? pendingClasses : ""}`}>{summary?.totalStakes ?? "0"} stakes</span></p>
      </div>
      <div className="flex items-center gap-2">
        <input type="search" placeholder="Search" className={`${inter.className} text-black placeholder:text-black`} />
        <button type="button" className="self-stretch aspect-square p-2 border-2 border-light-gray rounded-md cursor-pointer">
          <Image
            src={magnifyingGlassIcon}
            alt="magnifying glass"
            width={20}
            height={20}
            className="h-full aspect-square"
          />
        </button>
      </div>
    </div>
  )
}

type StakeWithCoupon = Stake & { coupon: string }

export function Tickets() {
  const [pending, setPending] = useState(true)
  const [tickets, setTickets] = useState<StakeWithCoupon[]>([]);
  const {selectedGames} = useAppState()

  async function fetchData() {
    setPending(true);
    try {
      const gameIds = selectedGames.map((item) => `gameId[]=${item.id}`).join("&")
      const date = getFormattedDate(new Date(), {monthFirst: true})
      const url = `/api/stakes?startDate=${date}&endDate=${date}&${gameIds}`
      const response = await fetch(url);
      const res = await response.json()

      const arr: StakeWithCoupon[] = [];

      if (!res.data) {
        res.data = []
      }

      res.data.forEach((item: TicketResponse, index: number) => {
        item.Stakes.forEach((elem: Stake) => {
          arr.push({
            ...elem,
            coupon: item.coupon,
          })
        })
      })
      setTickets(arr)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedGames])

  const placeholderRow = (children: React.ReactNode) => {
    return (
      <div className={`p-6 flex justify-center ${inter.className}`}>{children}</div>
    )
  }

  return (
    <div className={`h-full ${inter.className} flex flex-col`}>
      <div className="p-6 grid grid-cols-9 gap-4 font-bold">
        <div className="col-span-2">Ticket #</div>
        <div className="col-span-1">Play</div>
        <div className="col-span-3">Stakes</div>
        <div className="col-span-3">Retailers</div>
      </div>
      <div className="overflow-auto">
        {pending ? 
          placeholderRow(<Spinner />) : 
          tickets && tickets.length ? 
            tickets.map((item, index) => {
              return (
                <div key={`index-${index}`} className="p-6 grid grid-cols-9 gap-4 border-t-1 border-t-light-gray">
                  <div className="col-span-2 flex flex-col gap-2">
                    <span>{item.ticketNumber ?? "N/A"}</span>
                    <span className={`sub-text-font text-smokey-gray ${montserrat.className}`}>{item?.game?.name || "N/A"}</span>
                  </div>
                  <div className="col-span-1">{item.play}</div>
                  <div className="col-span-3 grid grid-cols-5 flex-wrap gap-2">
                    {item.stake.split(",").map((elem, pos) => {
                      return (
                        <div key={`index-${pos}`} className="grow aspect-square grid place-items-center border-1 border-light-gray rounded-md font-semibold">{elem}</div>
                      )
                    })}
                  </div>
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="grid place-items-center">
                      <Image src={profileAvatar} alt="Retailer profile picture" height={30} width={30} className="h-full aspect-square"/>
                    </div>
                    <div className={`${montserrat.className} flex flex-col justify-center gap-1`}>
                      <span>{item.retailClient.name || "N/A"}</span>
                      <span className="sub-text-font text-smokey-gray">{item.retailClient.contact.phone ? formatPhoneNumber(item.retailClient.contact.phone) : "N/A"}</span>
                    </div>
                  </div>
                </div>
              )
            }) : 
          placeholderRow(<Placeholder text="No Stakes available for today" />)
        }
      </div>
    </div>
  )
}

export function Retailers() {
  const [pending, setPending] = useState(true)
  const [retailerSummary, setRetailerSummary] = useState<RetailerSummary | null>(null);

  async function fetchData() {
    setPending(true);
    try {
      const date = getFormattedDate(new Date(), {monthFirst: true})
      const url = `/api/reports/sales/retailers?from=${date}&to=${date}`
      const response = await fetch(url);
      const res = await response.json()
      setRetailerSummary(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const placeholderRow = (children: React.ReactNode) => {
    return (
      <div className={`p-6 flex flex-col items-center justify-center ${inter.className}`}>{children}</div>
    )
  }

  return (
    <div className="h-full flex flex-col justify-stretch">
      <div className={`${montserrat.className} px-6 py-4 flex items-center justify-between border-b-1 border-b-light-gray`}>
        <div className="flex flex-col justify-center gap-1">
          <span className={`${golosText.className} font-semibold header-font`}>Retailers</span>
          <span className={`text-smokey-gray font-bold ${pending ? pendingClasses : ""}`}>{retailerSummary?.totalRetailers ?? 0}</span>
        </div>
        <div className="flex items-center gap-2 border-t-0 border-b-1 border-b-light-gray">
          <input type="search" className={`border-0! placeholder:Montserrat`} placeholder="Enter phone number or name" />
          <button type="button" className="px-2 aspect-square">
            <Image
              src={magnifyingGlassIcon}
              alt="magnifying glass"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div className="px-8 py-4 flex flex-col items-end gap-1 font-bold">
        <span className={`${montserrat.className} text-smokey-gray`}>Total Retailers Float</span>
        <span className={`main-number-font ${jura.className} ${pending ? pendingClasses : ""}`}>{retailerSummary?.totalRetailerFloat ?? 0}</span>
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className={`${inter.className} p-6 grid grid-cols-6 gap-4 font-bold bg-light-gray`}>
          <div className="col-span-3">Retailer</div>
          <div className="col-span-2">Sales</div>
          <div className="col-span-1">Stake #</div>
        </div>
        <div className="grow overflow-auto">
          {pending ? 
            placeholderRow(<Spinner />) : 
            retailerSummary?.retailers?.map((item, index) => {
              return (
                <div key={`index-${index}`} className="p-6 grid grid-cols-6 gap-4 items-center even:bg-white-smoke">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="grid place-items-center">
                      <Image src={item.retailClient.profileImage ?? profileAvatar} alt="qr code" height={30} width={30} />
                    </div>
                    <div className={`${montserrat.className} flex flex-col justify-center gap-1`}>
                      <span>{item.retailClient.name ?? "N/A"}</span>
                      <span className={`sub-text-font text-smokey-gray`}>{item.retailClient.contact.phone ? formatPhoneNumber(item.retailClient.contact.phone) : "N/A"}</span>
                    </div>
                  </div>
                  <div className={`${jura.className} col-span-2 sub-number-font`}>{item.sales}</div>
                  <div className={`${inter.className} col-span-1 me-4 text-end`}>{item.totalStakes}</div>
                </div>
              )
            }) ?? 
            placeholderRow(<Placeholder text="Retailers not available" />)
          }
        </div>
      </div>
    </div>
  )
}

export function Winnings() {
  const [pending, setPending] = useState(true)
  const [eventResults, setEventResults] = useState<EventResult[]>([]);
  const [drawDate, setDrawDate] = useState<string | null>(null)
  const dateInputRef = useRef<HTMLInputElement>(null);

  async function fetchData() {
    setPending(true);
    try {
      const url = `/api/winnings?gameId=1&startDate=${drawDate}&endDate=${drawDate}`
      const response = await fetch(url);
      const res = await response.json()
      setEventResults(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  function handleDrawDate() {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  }

  function initializeDate() {
    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)
    setDrawDate(getFormattedDate(yesterday, {monthFirst: true, separator: "/"}))
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const date = formatDateString(e.currentTarget.value)
    setDrawDate(date)
  }

  useEffect(() => {
    fetchData()
  }, [drawDate])

  useEffect(() => {
    initializeDate()
  })

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 flex flex-col gap-2 border-b-1 border-b-light-gray">
        <div className="flex justify-between">
          <div className={`${golosText.className} flex flex-col justify-between gap-4`}>
            <h2 className="font-semibold header-font">Winnings</h2>
            <p className="font-bold text-smokey-gray">Game</p>
          </div>
          <div className={`${montserrat.className} flex flex-col text-smokey-gray`}>
            <span className=" font-bold">Draw Date</span>
            <div className="p-2 flex items-center gap-2 border-light-gray border-1 rounded-sm text-black">
              <span>{drawDate ?? "N/A"} |</span>
              <button type="button" className="self-stretch aspect-square grid place-items-center" onClick={handleDrawDate}>
                <Image src={calendarIcon} alt="calendaricon" height={20} width={20} className="h-full aspect-square" />
                <input type="date" ref={dateInputRef} onChange={handleDateChange} style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />
              </button>
            </div>
          </div>
        </div>
        <div className={`${montserrat.className} flex items-center justify-between`}>
          <span className="font-normal">5/90 Original +</span>
          <p className=" font-bold text-end text-smokey-gray">
            Event #: <span className={`text-black ${pending ? pendingClasses : ""}`}>{eventResults ? eventResults[0]?.eventId : "N/A"}</span>
          </p>
        </div>
      </div>
      <div className={`${montserrat.className} px-6 py-4 flex items-center gap-4 border-b-1 border-b-light-gray`}>
        <span className="font-bold">5/90 Original:</span>
        <div className="grow flex gap-2">
          {eventResults ? eventResults[0]?.winningStake.split(",").map((item, index) => {
            return (
              <div key={`index-${index}`} className={`${inter.className} grow w-full grid place-items-center aspect-square bg-black text-white rounded-sm font-semibold`}>{item}</div>
            )
          }) : "N/A"}
        </div>
      </div>
      <div className="grow px-4 overflow-auto">
        {pending ? 
          <div className="p-6 flex flex-col items-center justify-center">
            <Spinner/>
          </div> : 
          (eventResults && eventResults.length && eventResults[0].winners.length) ? eventResults[0]?.winners.map((item, index) => {
          return (
            <div key={`index-${index}`} className="py-4 grid grid-cols-2 gap-2 border-b-1 border-b-[#E0E0E0]">
              <div className="flex flex-col gap-2">
                <div className="col-span-1 grid grid-cols-5 gap-2">
                  {item.stake.split(",").map((elem, pos) => {
                    return (
                      <div key={`elem-${pos}`} className={`${inter.className} w-max px-1 grid place-items-center aspect-square rounded-sm border-1 border-light-gray font-semibold`}>{elem}</div>
                    )
                  }) ?? <Placeholder />}
                </div>
                <p className={`${montserrat.className} text-smokey-gray sub-text-font`}>{item.play ?? "N/A"} | 5/90 Original</p>
              </div>
              <div className="col-span-1 flex flex-col items-end justify-between">
                <span className={`${jura.className} text-end sub-number-font`}>{item.amount ?? 0}</span>
                <span className={`${montserrat.className} text-smokey-gray sub-text-font`}>{item.retailClient.contact.phone ? formatPhoneNumber(item.retailClient.contact.phone) : "N/A"}</span>
              </div>
            </div>
          )
          }) : 
          <div className={`p-6 flex flex-col items-center justify-center ${inter.className}`}>
            <Placeholder text="Winnings not available"/>
          </div>
        }
      </div>
    </div>
  )
}

export function Payout() {
  return (
    <div className={`${montserrat.className} px-6 py-4 flex flex-col gap-2 font-bold text-smokey-gray`}>
      <h3>Payout Amount</h3>
      <p className={`${jura.className} text-black main-number-font`}>GHS 13,012,348.00</p>
      <span>to 13,084 players</span>
    </div>
  )
}

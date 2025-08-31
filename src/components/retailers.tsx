"use client"

import Image from "next/image";
import { Montserrat, Jura, Golos_Text } from "next/font/google";
import { useEffect, useState } from "react";
import { Entity, EntityStats, Game, RetailerPaneChildProps, RetailerSummary, RetailerTab, Stake, TicketResponse, Wallet } from "@/types";
import { Placeholder, Spinner } from "./general";
import { formatPhoneNumber, getFormattedDate } from "@/lib/helpers";
import callIcon from "../../public/icons/call.png"
import profileAvatar from "@public/avatar-sheena.png"
import magnifyingGlassIcon from "@public/icons/magnifying-glass.png"

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const jura = Jura({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const golosText = Golos_Text({
  weight: ['400', '500', '800'],
  subsets: ['latin'],
})

export function RetailersPane({ handleActiveRetailer }: RetailerPaneChildProps) {
  const [pending, setPending] = useState(true)
  const [retailers, setRetailers] = useState<Entity[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRetailers, setFilteredRetailers] = useState<Entity[] | null>(null)
  const [retailerSummary, setRetailerSummary] = useState<RetailerSummary | null>(null);

  function selectRetailer(id: string) {
    const match = retailers?.find((item) => item.id == id)
    if (match) handleActiveRetailer(match)
  }

  function handleSearch(value: string) {
    setSearchTerm(value)
    if (!value) {
      setFilteredRetailers(retailers)
    } else if (retailers) {
      const entities = retailers.filter((item) => item?.id?.toLowerCase().toLowerCase().includes(value.toLowerCase()) || item?.contact?.phone?.toLowerCase().includes(value.toLowerCase()) || item?.profile?.name?.toLowerCase().includes(value.toLowerCase()))
      setFilteredRetailers(entities)
    }
  }

  function triggerSearch() {
    handleSearch(searchTerm)
  }

  async function fetchData() {
    setPending(true);
    try {
      const entityId = 1
      const url = `/api/entities?entityTypeId[]=${entityId}`
      const response = await fetch(url);
      const res = await response.json()
      setRetailers(res.data)
      setFilteredRetailers(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  async function fetchRetailerSummary() {
    try {
      const date = getFormattedDate(new Date(), { monthFirst: true })
      const url = `/api/reports/sales/retailers`
      const response = await fetch(url);
      const res = await response.json()

      setRetailerSummary(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchRetailerSummary()
  }, [retailers])

  const placeholderRow = (children: React.ReactNode) => {
    return (
      <div className="py-5 flex flex-col items-center gap-2">{children}</div>
    )
  }

  return (
    <div className={`h-full flex flex-col gap-4 ${montserrat.className} text-black`}>
      <div className="flex gap-2 px-4 pt-6">
        <input type="search" className="grow p-3! placeholder:text-black border-pearl-bush! border-1!" value={searchTerm} onChange={(e) => handleSearch(e.currentTarget.value)} placeholder="Enter id, phone number or name" />
        <button type="button" className="h-full aspect-square grid place-items-center p-2 border-1 border-pearl-bush rounded-md" onClick={triggerSearch}>
          <Image src={magnifyingGlassIcon} alt="Magnifying glass" width={15} height={15} />
        </button>
      </div>
      <div className="px-4 flex flex-col items-end gap-1">
        <h3 className="text-heavy-metal">No. of Retailers</h3>
        <span className={`${jura.className} text-black font-bold main-number-font ${pending ? "placeholder" : ""}`}>{filteredRetailers?.length || 0}</span>
      </div>
      <div className="grow flex flex-col overflow-hidden">
        <div className="p-4 grid grid-cols-4 bg-pearl-bush table-header-font">
          <span className="col-span-1">ID #</span>
          <span className="col-span-3">NAME</span>
        </div>
        <div className="grow overflow-auto px-5">
          {pending ?
            placeholderRow(<Spinner />) :
            filteredRetailers?.map((item, index) => (
              <button type="button" key={`item-${index}`} className="w-full py-5 grid grid-cols-4 gap-2 border-b-1 border-b-pearl-bush" onClick={() => selectRetailer(item.id)} >
                <div className="place-content-center justify-self-start col-span-1">{item.id || "N/A"}</div>
                <div className="col-span-3 grid grid-cols-5 gap-4">
                  <div className="grid place-items-center">
                    <Image src={item?.profile?.profileImage || profileAvatar} alt="retailer profile picture" width={15} height={15} className="w-full" />
                  </div>
                  <div className="col-span-3 flex flex-col items-start">
                    <span>{item?.profile?.name || "N/A"}</span>
                    <span className="text-smokey-gray sub-text-font">{item.contact.phone ? formatPhoneNumber(item.contact.phone) : "N/A"}</span>
                  </div>
                  <div className="grid place-items-center">
                    {(retailerSummary?.retailers.some((elem) => elem.retailClient.id == item.id)) && <div className="w-4 aspect-square bg-blue-500 rounded-full"></div>}
                  </div>
                </div>
              </button>
            )) ||
            placeholderRow(<Placeholder text="Retailers not availble" />)
          }
        </div>
      </div>
    </div>
  )
}

export function RetailerCard({ activeRetailer }: { activeRetailer: Entity | undefined }) {
  const [pending, setPending] = useState(false)
  const [retailerStats, setRetailerStats] = useState<EntityStats[] | null>(null)

  async function fetchData() {
    setPending(true);
    try {
      const entityId = activeRetailer?.id
      const url = `/api/entities/stats?entityId=${entityId}`
      const response = await fetch(url);
      const res = await response.json()
      setRetailerStats(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (activeRetailer) fetchData()
  }, [activeRetailer])

  if (!activeRetailer) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${montserrat.className}`}>
        <Placeholder text="Select a retailer to view their details" />
      </div>
    )
  }

  return (
    <div className={`py-4 flex flex-col items-start gap-6 ${montserrat.className}`}>
      <div className="flex items-center gap-8">
        <div>
          <Image src={profileAvatar} alt="Retailer profile picture" width={120} height={120} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-2">
            <h1 className="font-bold emphasis-font">{activeRetailer?.profile?.name || "N/A"}</h1>
            <span className={`${golosText.className} text-heavy-metal`}>{activeRetailer?.id} Active</span>
          </div>
          <div className="flex gap-20 font-bold">
            <div className="flex flex-col">
              <h3 className="">Players</h3>
              <span className={`${jura.className} ${pending ? "placeholder" : ""}`}>{(retailerStats && retailerStats.length) ? retailerStats[0].stats?.players : "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="">Winners</h3>
              <span className={`${jura.className} ${pending ? "placeholder" : ""}`}>{(retailerStats && retailerStats.length) ? retailerStats[0].stats?.winners : "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="">Sales</h3>
              <span className={`${jura.className} ${pending ? "placeholder" : ""}`}>{(retailerStats && retailerStats.length) ? retailerStats[0].stats?.sales : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <a href={`"tel:${activeRetailer?.contact?.phone || "N/A"}`} className="p-4 flex items-center gap-2 border-1 border-light-gray rounded-lg font-bold">
          <div>
            <Image src={callIcon} alt="Call icon" width={18} height={18} />
          </div>
          <span>{activeRetailer.contact.phone ? formatPhoneNumber(activeRetailer.contact.phone) : "N/A"}</span>
        </a>
      </div>
    </div>
  )
}

const tabs: RetailerTab[] = [
  {
    id: "insight",
    name: "Insight",
    content: InsightTabContent,
  },
  {
    id: "sales",
    name: "Sales",
    content: SalesTabContent,
  },
  {
    id: "wallet",
    name: "Wallet",
    content: WalletTabContent,
  },
  {
    id: "issues",
    name: "Issues",
    content: IssuesTabContent,
  },
  {
    id: "notification",
    name: "Notification",
    content: NotificationTabContent,
  },
]

export function RetailerTabs({ activeRetailer }: { activeRetailer: Entity | undefined }) {
  const [activeTab, setActiveTab] = useState<RetailerTab>(tabs[1])

  const handleTab = (id: string) => {
    const match = tabs.find((item) => item.id == id)
    if (match) setActiveTab(match)
  }

  return (
    <div className={`h-full flex flex-col ${montserrat.className}`}>
      <div className={`py-6 flex gap-8 border-b-1 border-b-pearl-bush ${golosText.className}`}>
        {tabs.map((item) => (
          <button type="button" key={`item-${item.id}`} className={`header-font ${item.id == activeTab.id ? "font-extrabold" : "font-medium"}`} onClick={() => handleTab(item.id)}>{item.name}</button>
        ))}
      </div>
      <activeTab.content activeRetailer={activeRetailer} />
    </div>
  )
}

function SalesTabContent({ activeRetailer }: { activeRetailer: Entity | undefined }) {
  const [pending, setPending] = useState(false)
  const [tickets, setTickets] = useState<Stake[]>([])
  const [games, setGames] = useState<Game[]>([])

  async function fetchData() {
    try {
      const gameIds = games.map((item) => `gameId[]=${item.id}`).join("&")
      const url = `/api/stakes?entityId=${activeRetailer?.id}&${gameIds}`
      const response = await fetch(url);
      const res = await response.json()

      const arr: Stake[] = [];

      if (!res.data) {
        res.data = []
      }

      res.data.forEach((item: TicketResponse, index: number) => {
        item.Stakes.filter((item) => item?.retailClient?.id == activeRetailer?.id).forEach((elem: Stake) => {
          arr.push(elem)
        })
      })
      setTickets(arr)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  async function fetchGames() {
    setPending(true)
    try {
      const url = "/api/games"
      const response = await fetch(url);
      const res = await response.json()
      if (!res.data || !res.data.length) {
        res.data = []
      }

      setGames(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (activeRetailer) fetchGames()
  }, [activeRetailer])

  useEffect(() => {
    if (activeRetailer) fetchData()
  }, [games])

  const placeholderRow = (children: React.ReactNode) => {
    return (
      <tr>
        <td colSpan={7} className="py-6">
          <div className="flex justify-center">
            {children}
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className="grow overflow-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-white z-0">
          <tr className="border-b-1 border-b-pearl-bush">
            <th className="pt-6 pb-2 px-2 text-start">Ticket #</th>
            <th className="pt-6 pb-2 px-2 text-start">Date of Sales</th>
            <th className="pt-6 pb-2 px-2 text-start">Game</th>
            <th className="pt-6 pb-2 px-2 text-start">Play</th>
            <th className="pt-6 pb-2 px-2 text-start">Stake</th>
            <th className="pt-6 pb-2 px-2 text-start">Amount</th>
            <th className="pt-6 pb-2 px-2 text-start">Player&#39;s phone</th>
          </tr>
        </thead>
        <tbody>
          {(!activeRetailer && !pending) && placeholderRow(<Placeholder text="Select a retailer to view their tickets" />)}
          {pending ?
            placeholderRow(<Spinner />) :
            (tickets && tickets.length) ? tickets.map((item, index) => {
              return (
                <tr key={`item-${index}`} className="px-2 border-b-1 border-b-pearl-bush">
                  <td className="py-4 px-2">{item.ticketNumber || "N/A"}</td>
                  <td className="py-4 px-2">{item.createdAt || "N/A"}</td>
                  <td className="py-4 px-2">{item.game.name || "N/A"}</td>
                  <td className="py-4 px-2">{item.play || "N/A"}</td>
                  <td className="py-4 px-2">
                    <div className="flex gap-2">
                      {(item.stake && item.stake.length) ? item.stake.split(",").map((elem, index) => (
                        <div key={`elem-${index}`} className={`w-max px-1 grid place-items-center aspect-square rounded-sm border-1 border-light-gray font-semibold`}>{elem}</div>
                      )) : "N/A"}
                    </div>
                  </td>
                  <td className="py-4 px-2">{item.stakeAmount || "N/A"}</td>
                  <td className="py-4 px-2">{item.playerPhoneNumber ? formatPhoneNumber(item.playerPhoneNumber) : "N/A"}</td>
                </tr>
              )
            }) : (activeRetailer && !tickets.length) && placeholderRow(<Placeholder text="Tickets not available" />)
          }
        </tbody>
      </table>
    </div>
  )
}

function WalletTabContent({ activeRetailer }: { activeRetailer: Entity | undefined }) {
  const [pending, setPending] = useState(false)
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [activeWallet, setActiveWallet] = useState<Wallet | null>(null)

  function handleActiveWallet(id: number) {
    const match = wallets.find((item) => item.walletId == id)
    if (match) setActiveWallet(match)
  }

  async function fetchData() {
    setPending(true);
    try {
      const url = `/api/wallets?entityId=${activeRetailer?.id}`
      const response = await fetch(url);
      const res = await response.json()

      if (!res.data) {
        res.data = []
      }
      const PERSONAL = 'personal';
      res.data = res.data.filter((item: Wallet) => item.walletName.toLowerCase() != PERSONAL)

      setWallets(res.data)
      setActiveWallet(null)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (activeRetailer) {
      fetchData()
    }
  }, [activeRetailer])

  const placeholderCont = (children: React.ReactNode) => {
    return (
      <div className="h-full w-full p-6 flex justify-center">{children}</div>
    )
  }

  const placeholderRow = (children: React.ReactNode) => {
    return (
      <tr>
        <td colSpan={5}>
          <div className="p-6 w-full flex justify-center">
            {children}
          </div>
        </td>
      </tr>
    )
  }

  if (!activeRetailer) {
    return placeholderCont(<Placeholder text="Select a retailer to view their wallets" />)
  }

  return (
    <div className={`h-full flex flex-col gap-6 ${montserrat.className}`}>
      <div className="basis-[15%] p-6 flex gap-6">
        {pending ?
          placeholderCont(<Spinner />) :
          wallets.map((item, index, arr) => {
            if (!arr.length) {
              return placeholderCont(<Placeholder text="Wallets not available" />)
            }
            return (
              <button key={`item-${index}`} type="button" className={`px-16 py-4 flex flex-col justify-center gap-2 rounded-lg ${activeWallet?.walletId == item.walletId ? "bg-pearl-bush" : " border-3 border-pearl-bush"} shadow-pearl-bush shadow-[0_4px_4px_0px] font-bold`} onClick={() => handleActiveWallet(item.walletId)}>
                <span className="text-smokey-gray">{item?.walletName || "N/A"} - {item.walletAccountNumber || "N/A"}</span>
                <h4 className={`${jura.className} main-number-font`}>{item.balance || "N/A"}</h4>
              </button>
            )
          })
        }
      </div>
      <div className="grow overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white z-0 text-black font-bold">
            <tr className="border-b-1 border-b-pearl-bush">
              <td className="px-2 py-4">Date</td>
              <td className="px-2 py-4">Description</td>
              <td className="px-2 py-4">Type</td>
              <td className="px-2 py-4">Amount (GHS)</td>
              <td className="px-2 py-4">Balance (GHS)</td>
            </tr>
          </thead>
          <tbody>
            {!activeWallet ?
              placeholderRow(<Placeholder text="Select a wallet to view its transaction history" />) :
              activeWallet?.history?.length ? activeWallet.history.map((elem, index) => {
                return (
                  <tr key={`item-${index}`} className="border-b-1 border-b-pearl-bush">
                    <td className="ps-4 pe-2 py-6">{elem.transactionDateTime || "N/A"}</td>
                    <td className="px-2 py-6">{elem.description || "N/A"}</td>
                    <td className="px-2 py-6">{elem.type || "N/A"}</td>
                    <td className="px-2 py-6">{elem.amount || "N/A"}</td>
                    <td className="ps-2 pe-4 py-6">{elem.balance || "N/A"}</td>
                  </tr>
                )
              }) :
                placeholderRow(<Placeholder text="Transaction history not available" />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InsightTabContent({ activeRetailer }: { activeRetailer: Entity | undefined }) {
  return <div></div>
}

function NotificationTabContent({ activeRetailer }: { activeRetailer: Entity | undefined }) {
  return <div></div>
}

function IssuesTabContent({ activeRetailer }: { activeRetailer: Entity | undefined }) {
  return <div></div>
}
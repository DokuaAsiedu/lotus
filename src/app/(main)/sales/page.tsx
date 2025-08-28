import { Payout, Retailers, Summary, Tickets, Winnings } from '@/components'

export default function Sales() {
  return (
    <div className="w-full h-full grid xl:grid-cols-12 grid-rows-[100%] gap-4">
      <div className="col-span-12 xl:col-span-5 h-full flex flex-col items-stretch gap-6">
        <div className="px-4 py-2 border-light-gray border-1 rounded-md">
          <Summary />
        </div>
        <div className="grow border-light-gray border-1 rounded-md overflow-hidden">
          <Tickets />
        </div>
      </div>
      <div className="h-full col-span-12 xl:col-span-4 border-light-gray border-1 rounded-md">
        <Retailers />
      </div>
      <div className="h-full col-span-12 xl:col-span-3 flex flex-col justify-between gap-5">
        <div className="grow border-light-gray border-1 rounded-md overflow-hidden">
          <Winnings />
        </div>
        <div className="border-light-gray border-1 rounded-md">
          <Payout />
        </div>
      </div>
    </div>
  )
}

import { Payout, Retailers, Summary, Tickets, Winnings } from '@/components'

export default function Sales() {
  return (
    <div className="w-full grid xl:grid-cols-12 gap-4">
      <div className="col-span-12 xl:col-span-5 flex flex-col items-stretch flex-wrap gap-6">
        <div className="px-4 py-2 border-light-gray border-1 rounded-md">
          <Summary />
        </div>
        <div className="border-light-gray border-1 rounded-md">
          <Tickets />
        </div>
      </div>
      <div className="col-span-12 xl:col-span-4 border-light-gray border-1 rounded-md">
        <Retailers />
      </div>
      <div className="col-span-12 xl:col-span-3 flex flex-col justify-between gap-5">
        <div className="grow border-light-gray border-1 rounded-md">
          <Winnings />
        </div>
        <div className="border-light-gray border-1 rounded-md">
          <Payout />
        </div>
      </div>
    </div>
  )
}

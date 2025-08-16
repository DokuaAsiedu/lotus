import { Summary } from '@/components'

export default function Sales() {
  return (
    <div className="p-4 w-full grid md:grid-cols-11 gap-4">
      <div className="col-span-11 lg:col-span-5 flex flex-col items-stretch flex-wrap gap-6">
        <div className="px-4 py-2 border-light-gray border-1 rounded-md">
          <Summary />
        </div>
      </div>
      <div className="col-span-11 lg:col-span-4 border-light-gray border-1 rounded-md"></div>
      <div className="col-span-11 lg:col-span-2 border-light-gray border-1 rounded-md"></div>
    </div>
  )
}

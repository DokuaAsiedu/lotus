import { gameEvents } from '@/lib'
import { Inter, Jura } from 'next/font/google'

const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

const jura = Jura({
  weight: ['700'],
  subsets: ['latin'],
})

export function MenuBar() {
  return (
    <div className="px-2 py-4 flex items-center justify-between flex-wrap border-b-1 border-b-light-gray">
      <div className={`${inter.className} flex items-center flex-wrap gap-4`}>
        <button type="button" className="py-2 px-4 bg-eastern-blue text-white rounded-md">
          Games
        </button>
        {gameEvents.map((item, index) => {
          return (
            <div key={`item-${index}`} className="flex gap-3">
              <input name={item.name} type="checkbox" />
              <label htmlFor={item.name}>{item.text}</label>
            </div>
          )
        })}
      </div>
      <div className={` flex items-center gap-4`}>
        <span className="font-bold text-xs">Next Draw In</span>
        <span className={`${jura.className} font-bold`}>00h : 45m : 34s</span>
      </div>
    </div>
  )
}

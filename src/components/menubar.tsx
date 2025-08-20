import { gameEvents } from '@/lib'
import { Inter, Jura, Montserrat } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

const jura = Jura({
  weight: ['700'],
  subsets: ['latin'],
})

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export function MenuBar() {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <div className={`${inter.className} flex items-center flex-wrap gap-4`}>
        <button type="button" className="self-stretch w-22">
          <Image
            src="/icons/games.png"
            alt="icon with text 'games'"
            width={100}
            height={10}
            layout="responsive"
          />
        </button>
        {gameEvents.map((item, index) => {
          return (
            <div key={`item-${index}`} className="flex items-center gap-3">
              <input name={item.name} id={item.name} type="checkbox" />
              <label htmlFor={item.name}>{item.text}</label>
            </div>
          )
        })}
      </div>
      <div className={`flex items-center gap-4`}>
        <span className={`${montserrat.className} font-bold text-sm`}>Next Draw In</span>
        <span className={`${jura.className} font-bold text-2xl`}>00h : 45m : 34s</span>
      </div>
    </div>
  )
}

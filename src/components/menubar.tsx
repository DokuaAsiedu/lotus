"use client"

import { Inter, Jura, Montserrat } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from "react"
import { Placeholder, Spinner } from "./general"
import { Game } from "@/types"
import { useAppState } from "@/providers/state-provider"
import gamesIcon from "@public/icons/games.png"

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
  const [pending, setPending] = useState(true)
  const [games, setGames] = useState<Game[]>([]);
  const {selectedGames, handleSelectedGames} = useAppState()

  async function fetchData() {
    setPending(true);
    try {
      const url = "/api/games"
      const response = await fetch(url);
      const res = await response.json()
      setGames(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setPending(false);
    }
  }

  const handleGame = (gameId: Game["id"]) => {
    const match = selectedGames.find((item: Game) => item.id == gameId)
    if (match) {
      handleSelectedGames(selectedGames.filter((item) => item.id == match.id))
    } else {
      const game = games.find((item) => item.id == gameId)
      if (game) handleSelectedGames([...selectedGames, game])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className={`${inter.className} flex items-center flex-wrap gap-4`}>
        <button type="button" className="self-stretch w-22">
          <Image
            src={gamesIcon}
            alt="icon with text 'games'"
            width={100}
            height={10}
            layout="responsive"
          />
        </button>
        {pending ? <Spinner /> : games?.map((item, index) => {
          return (
            <div key={`item-${index}`} className="flex items-center gap-3">
              <input name="name" id={`item-${item.id}`} type="checkbox" onChange={() => handleGame(item.id)} />
              <label htmlFor={`item-${item.id}`}>{item.name}</label>
            </div>
          )
        }) ?? <Placeholder text="Games not available" />}
      </div>
      <div className={`flex items-center gap-4`}>
        <span className={`${montserrat.className} font-bold text-sm`}>Next Draw In</span>
        <span className={`${jura.className} font-bold text-2xl`}>00h : 45m : 34s</span>
      </div>
    </div>
  )
}

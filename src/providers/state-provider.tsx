"use client"

import { Game, State } from "@/types";
import { createContext, useContext, useState } from "react";

const state: State = {
  selectedGames: [],
  handleSelectedGames: () => {},
}

const AppStateContext = createContext(state)

export function AppStateProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [selectedGames, setSelectedGames] = useState<Game[]>([])

  const handleSelectedGames = (data: Game[]) => {
    setSelectedGames(data)
  }

  return (
    <AppStateContext.Provider value={{ selectedGames, handleSelectedGames }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => useContext(AppStateContext)
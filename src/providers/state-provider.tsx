"use client"

import { Game, State, WinningsSummary } from "@/types";
import React, { createContext, useContext, useState } from "react";

const state: State = {
  selectedGames: [],
  handleSelectedGames: () => {},
  dropdownTrigger: null,
  setDropdownTrigger: () => null,
  dropdownChildren: null,
  setDropdownChildren: () => null,
  winningsPending: false,
  setWinningsPending: () => null,
  winningsSummary: null,
  setWinningsSummary: () => null,
}

const AppStateContext = createContext(state)

export function AppStateProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [selectedGames, setSelectedGames] = useState<Game[]>([])
  const [dropdownTrigger, setDropdownTrigger] = useState<HTMLElement | null>(null)
  const [dropdownChildren, setDropdownChildren] = useState<React.JSX.Element | null>(null)
  const [winningsPending, setWinningsPending] = useState(false)
  const [winningsSummary, setWinningsSummary] = useState<WinningsSummary | null>(null)

  const handleSelectedGames = (data: Game[]) => {
    setSelectedGames(data)
  }

  return (
    <AppStateContext.Provider value={{ selectedGames, handleSelectedGames, dropdownTrigger, setDropdownTrigger, dropdownChildren, setDropdownChildren, winningsPending, setWinningsPending, winningsSummary, setWinningsSummary }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => useContext(AppStateContext)
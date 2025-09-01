"use client"

import { Game, State } from "@/types";
import React, { createContext, useContext, useState } from "react";

const state: State = {
  selectedGames: [],
  handleSelectedGames: () => {},
  dropdownTrigger: null,
  setDropdownTrigger: () => null,
  dropdownChildren: null,
  setDropdownChildren: () => null,
}

const AppStateContext = createContext(state)

export function AppStateProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [selectedGames, setSelectedGames] = useState<Game[]>([])
  const [dropdownTrigger, setDropdownTrigger] = useState<HTMLElement | null>(null)
  const [dropdownChildren, setDropdownChildren] = useState<React.JSX.Element | null>(null)

  const handleSelectedGames = (data: Game[]) => {
    setSelectedGames(data)
  }

  return (
    <AppStateContext.Provider value={{ selectedGames, handleSelectedGames, dropdownTrigger, setDropdownTrigger, dropdownChildren, setDropdownChildren }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => useContext(AppStateContext)
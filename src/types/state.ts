import React from "react";
import { Game } from "./sales"

export interface State {
  selectedGames: Game[],
  handleSelectedGames: (data: Game[]) => void,
  dropdownTrigger: HTMLElement | null,
  setDropdownTrigger: (el: HTMLElement | null) => void,
  dropdownChildren: React.JSX.Element | null,
  setDropdownChildren: (el: React.JSX.Element | null) => void,
  winningsPending: boolean,
  setWinningsPending: (value: boolean) => void,
  winningsSummary: WinningsSummary | null,
  setWinningsSummary: (value: WinningsSummary | null) => void,
}

export type WinningsSummary = {
  payoutAmount: number,
  totalNumOfPlayers: number,
}

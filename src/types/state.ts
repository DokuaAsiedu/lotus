import React from "react";
import { Game } from "./sales"

export interface State {
  selectedGames: Game[],
  handleSelectedGames: (data: Game[]) => void,
  dropdownTrigger: HTMLElement | null,
  setDropdownTrigger: (el: HTMLElement | null) => void,
  dropdownChildren: React.JSX.Element | null,
  setDropdownChildren: (el: React.JSX.Element | null) => void,
}

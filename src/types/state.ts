import { Game } from "./sales"

export interface State {
  selectedGames: Game[],
  handleSelectedGames: (data: Game[]) => void,
}

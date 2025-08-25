import { ImSpinner2 } from "react-icons/im";

type data = {
  text: string,
}

export function Spinner({ text }: data) {
  return (
    <div className="flex items-center gap-2">
      <ImSpinner2 className="animate-spin" />
      <span>{text || "Loading..."}</span>
    </div>
  )
}

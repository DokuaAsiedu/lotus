import { ImSpinner2 } from "react-icons/im";

type SpinnerProps = {
  text?: string,
}

export function Spinner({ text = "Loading...",  }: SpinnerProps) {
  return (
    <div className="flex items-center gap-2">
      <ImSpinner2 className="animate-spin" />
      <span>{text}</span>
    </div>
  )
}

export function Placeholder({text = "Not available"}: {text?: string}) {
  return (
    <div>{text}</div>
  )
}

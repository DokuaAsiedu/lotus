import { Jura } from "next/font/google";
import { ImSpinner2 } from "react-icons/im";

const jura = Jura({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

type SpinnerProps = {
  text?: string,
}

export function Spinner({ text = "Loading...",  }: SpinnerProps) {
  return (
    <div className="flex items-center gap-2">
      <ImSpinner2 className="animate-spin" />
      <span className={`${jura.className}`}>{text}</span>
    </div>
  )
}

export function Placeholder({text = "Not available"}: {text?: string}) {
  return (
    <div className={`${jura.className} text-lg`}>{text}</div>
  )
}

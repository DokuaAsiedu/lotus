"use client"

import { usePathname } from "next/navigation"
import React from "react"
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
    <div>{text}</div>
  )
}

export default function MenuBarWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname()

  if (path !== "/retailers") {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}
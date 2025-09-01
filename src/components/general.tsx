"use client"

import { usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { Jura } from "next/font/google";
import { ImSpinner2 } from "react-icons/im";
import { useAppState } from "@/providers/state-provider";

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

export function Dropdown() {
  const [display, setDisplay] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })
  const { dropdownTrigger, setDropdownTrigger, dropdownChildren } = useAppState()

  useEffect(() => {
    if (dropdownTrigger) {
      const rect = dropdownTrigger.getBoundingClientRect()
      setCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX })
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }, [dropdownTrigger])

  if (!display) return null

  return (
    <div className="fixed top-0 left-0 z-[99]">
      <div className="fixed top-0 left-0 w-screen h-screen z-[100]" onClick={() => setDropdownTrigger(null)}></div>
      <div className="absolute z-[101] bg-white border-1 border-pearl-bush rounded-lg" style={{ top: coords.top, left: coords.left }}>
        {dropdownChildren}
      </div>
    </div>
  )
}
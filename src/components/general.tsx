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
  const wrapper = useRef<HTMLDivElement | null>(null)

  function calculatePosition() {
    const rect = dropdownTrigger?.getBoundingClientRect()
    const wrapperRect = wrapper.current?.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const dropdownHeight = wrapperRect?.height || 0
    const spaceBelow = viewportHeight - (rect ? rect.bottom : 0)

    let top: number
    if (spaceBelow < dropdownHeight) {
      top = (rect ? rect.top : 0) - dropdownHeight
    } else {
      top = (rect ? rect.bottom : 0)
    }

    setCoords({ top, left: (rect?.left || 0) })
  }

  function handleDropdownPosition() {
    if (dropdownTrigger && wrapper.current) {
      calculatePosition()
    } else {
      setDisplay(false)
    }
  }

  function handleClickOutside(e: Event) {
    if (dropdownTrigger && !dropdownTrigger.contains(e.target as Node) && wrapper.current && !wrapper.current.contains(e.target as Node)) {
      setDisplay(false)
    }
    calculatePosition()
  }

  useEffect(() => {
  if (display) {
    handleDropdownPosition()
  }
}, [display])

  useEffect(() => {
    if (dropdownTrigger) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }, [dropdownTrigger])

  useEffect(() => {
    window.addEventListener("scroll", handleDropdownPosition)

    return () => {
      window.removeEventListener('scroll', handleDropdownPosition);
    };
  })

  useEffect(() => {
    window.addEventListener("click", handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  })

  if (!display) return null

  return (
    <div className="fixed top-0 left-0">
      {/* <div className="fixed top-0 left-0 w-screen h-screen z-[100]" onClick={() => setDropdownTrigger(null)}></div> */}
      <div ref={wrapper} className="absolute z-[20] bg-white border-1 border-pearl-bush rounded-lg" style={{ top: coords.top, left: coords.left }}>
        {dropdownChildren}
      </div>
    </div>
  )
}
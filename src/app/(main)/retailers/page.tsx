"use client"

import { RetailerCard, RetailersPane, RetailerTabs } from "@/components";
import { Entity } from "@/types";
import { useState } from "react";

export default function Retailers() {
  const [activeRetailer, setActiveRetailer] = useState<Entity | undefined>(undefined)

  return (
    <div className="h-full w-full grid grid-cols-4 grid-rows-[100%] gap-2">
      <div className="col-span-3 h-full flex flex-col">
        <div className="basis-[20%]">
          <RetailerCard activeRetailer={activeRetailer} />
        </div>
        <div className="grow overflow-hidden">
          <RetailerTabs activeRetailer={activeRetailer} />
        </div>
      </div>
      <div className="h-full col-span-1 border-1 rounded-lg border-light-gray">
        <RetailersPane handleActiveRetailer={setActiveRetailer} />
      </div>
    </div>
  )
}
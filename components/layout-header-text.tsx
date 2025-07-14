"use client"

import { usePathname } from 'next/navigation'
import React from 'react'

const LayoutHeaderText = () => {
    const name = usePathname().split("-").join(" ").replace("/", "");

  return (
    <div>
        <h1 className="text-3xl font-roboto font-bold uppercase">{name || "Dashboard"}</h1>
    </div>
  )
}

export default LayoutHeaderText
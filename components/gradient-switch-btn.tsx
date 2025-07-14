"use client";

import React, { useState } from 'react'

export const GradientSwitchBtn = () => {
    const [activeBtn, setActiveBtn] = useState(true)

  return (
    <div className="flex w-full text-sm font-medium my-5">
        <button className={`flex-1 ${activeBtn ? "bg-gray-200 text-gray-500": "gradient-button rounded-sm"} py-1 `} onClick={() => setActiveBtn((prev) => !prev)}>
            Experience listing
        </button>
        <button className={`flex-1 ${activeBtn ? "gradient-button rounded-sm": "bg-gray-200 text-gray-500"} py-1`} onClick={() => setActiveBtn((prev) => !prev)}>
            Gift card listing
        </button>
    </div>
  )
}

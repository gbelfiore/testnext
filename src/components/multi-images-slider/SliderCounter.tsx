import React from 'react'

const SliderCounter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute left-[2px] top-[4px] z-50 rounded-full bg-white px-[4px] py-[2px] text-[10px] font-[500] opacity-70">{children}</div>
  )
}

export { SliderCounter }

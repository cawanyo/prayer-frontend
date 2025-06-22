import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between ">
      {children}
    </div>
  )
}

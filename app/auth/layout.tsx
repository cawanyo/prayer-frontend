import React, { useContext } from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="">
      {children}
    </div>
  )
}

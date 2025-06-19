import Footer from '@/components/base/Footer'
import Header from '@/components/base/Header'
import Navbar from '@/components/base/Navbar'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between ">
      {/* Sidebar */}
      <Header/>
      {children}

      <Footer />
    </div>
  )
}

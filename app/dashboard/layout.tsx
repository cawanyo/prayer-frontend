'use client'
import Navbar from '@/components/base/Navbar'
import { useAuth } from '@/utils/AuthContext'
import { redirect} from 'next/navigation';
import React, { useEffect } from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  const auth = useAuth();
  useEffect(() => {
    console.log(auth)
    if (!auth?.loading && !auth?.isAuthenticated ) {
      redirect('/auth')
    }
  }, [auth?.user, auth?.loading]);
  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row">
      {/* Sidebar */}
      <Navbar  />
      {children}
    </div>
  )
}

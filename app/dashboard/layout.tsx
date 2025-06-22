'use client'

import Navbar from '@/components/base/Navbar'
import { useAuth } from '@/utils/AuthContext'
import { redirect} from 'next/navigation';
import React, { useEffect } from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  const auth = useAuth();
  useEffect(() => {
    if (!auth?.loading && !auth?.isAuthenticated ) {
      redirect('/')
    }
  }, [auth?.user, auth?.loading]);
  return (
      <div className=' mt-3 w-full min-h-screen flex flex-col sm:flex-row'>
        <Navbar  />
        {children}
      </div>
  )
}

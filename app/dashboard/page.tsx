'use client';
import LoadingOverlay from '@/components/base/LoadingOverlay';
import { useAuth } from '@/utils/AuthContext';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
  const auth = useAuth();

  useEffect(()=>{
    console.log(auth?.loading, auth?.isAuthenticated)
    if (!auth?.loading){
      if (auth?.isAuthenticated) {
        redirect('/dashboard/prayers')
      }
      else{
        redirect('/auth')
      }
    }
    

  },[auth?.loading])
  
  
  return (
    <div>
      {auth?.loading
        &&
        <LoadingOverlay />
      }
      
    </div>
  )
}

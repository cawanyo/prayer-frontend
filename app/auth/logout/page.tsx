'use client'
import { AuthContext } from '@/utils/AuthContext';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react'

export default function page() {
  const auth = useContext(AuthContext);
  auth?.logout()
  redirect('/')


  return (
    <div>
      
    </div>
  )
}

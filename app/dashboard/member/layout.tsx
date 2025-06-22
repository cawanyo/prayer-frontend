'use client'
import { useAuth } from '@/utils/AuthContext';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'


export default function layout({children}: {children: React.ReactNode}) {

    const auth = useAuth();
    useEffect(() =>() => {
        if (!auth?.loading && !auth?.isIntercesseur && !auth?.isResponsable) {
        redirect('/')
        }
    }, [auth?.loading]);


  return (
    <>
      {children}
    </>
  )
}

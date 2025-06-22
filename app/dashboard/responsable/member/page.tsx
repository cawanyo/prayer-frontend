'use client'
import DemandCard from '@/components/responsable/member/DemandCard'
import { UserDemandType } from '@/types/user';
import { getDemandList } from '@/utils/auth';
import React, { useEffect, useState } from 'react'



export default function page() {

  const [demandList, setDemandList] = useState<UserDemandType[]>([]);
  
  useEffect(() => {
    const get = async() => {
      const demandList = await getDemandList();
      setDemandList(demandList.filter((demand: UserDemandType)=>demand.state=="pending"));
    }
    get();
  }, [])
  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Demandes en cours</h2>
      <div className='p-3 grid md:grid-cols-2 gap-4'>
        {
          demandList.map((demand, index) => <DemandCard key={index} initialDemand={demand}/> )
        }
        
      </div>
    </div>
  )
}

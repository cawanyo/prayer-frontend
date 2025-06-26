'use client'
import DemandCard from '@/components/responsable/member/DemandCard'
import RdvValidationCard from '@/components/responsable/rdv/RdvValidationCard';
import { RDVType } from '@/types/rdv';
import { UserDemandType } from '@/types/user';
import { getDemandList } from '@/utils/auth';
import { getAllRDV } from '@/utils/rdv';
import React, { useEffect, useState } from 'react'



export default function page() {

  const [demandList, setDemandList] = useState<UserDemandType[]>([]);
  const [allRdv, setAllRdv] = useState<RDVType[]>([])
  useEffect(() => {
    const get = async() => {

      const {success: successDemand, data: demandList} = await getDemandList();
      if(successDemand)
        setDemandList(demandList.filter((demand: UserDemandType)=>demand.state=="pending"));

      const {success: successRdv, data: rdvList} = await getAllRDV();
      if(successRdv)
        setAllRdv(rdvList);
    }
    get();
  }, [])
  return (
    <div className="p-6 w-full mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4">Adhésion à l'intercession</h2>
        <div className='p-3 grid md:grid-cols-2 gap-4'>
          {
            demandList.map((demand, index) => <DemandCard key={index} initialDemand={demand}/> )
          }

        </div>
      </div>
      

      {/* <div>
        <h2 className="text-2xl font-bold mb-4">Demandes de rdv </h2>
        <div className='p-3 grid md:grid-cols-2 gap-4'>
          {
            allRdv.map((rdv, index) => <RdvValidationCard key={index} rdv={rdv}/> )
          }

        </div>
      </div> */}

    </div>
  )
}

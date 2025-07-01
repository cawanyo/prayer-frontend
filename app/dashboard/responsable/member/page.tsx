'use client'
import LoadingOverlay from '@/components/base/LoadingOverlay';
import DemandCard from '@/components/responsable/member/DemandCard'
import RdvValidationCard from '@/components/responsable/rdv/RdvValidationCard';
import { RDVType } from '@/types/rdv';
import { UserDemandType } from '@/types/user';
import { getDemandList } from '@/utils/auth';
import { getAllRDV } from '@/utils/rdv';
import React, { useEffect, useState } from 'react'



export default function page() {

  const [demandList, setDemandList] = useState<UserDemandType[]>([]);
  const [allRdv, setAllRdv] = useState<RDVType[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("pending"); 
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    setLoading(true);

    const get = async() => {
      const {success: successDemand, data} = await getDemandList({page:page,
        state: state !== "all" ? state : undefined,});
      if (successDemand) {
        setDemandList(data.results || []);
        setHasNext(!!data.next);
        setHasPrevious(!!data.previous);
      }


      // const {success: successRdv, data: rdvList} = await getAllRDV();
      // if(successRdv)
      //   setAllRdv(rdvList);
    }
    get();

    setLoading(false);
  }, [state])
  return (
    <div className="p-6 w-full mx-auto">
      {
        loading
        &&
        <LoadingOverlay />
      }
      <div>
        <h2 className="text-2xl font-bold mb-4">Adhésion à l'intercession</h2>


        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div>
            <label className="text-sm font-medium block mb-1">Filtrer par état :</label>
            <select
              className="border p-2 rounded text-sm"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="all">🔘 Tous</option>
              <option value="pending">⏳ En attente</option>
              <option value="accepted">✅ Accepté</option>
              <option value="refused">❌ Refusé</option>
            </select>
          </div>
        </div>



        <div className='p-3 grid md:grid-cols-2 gap-4'>
          {
            demandList.map((demand, index) => <DemandCard key={index} initialDemand={demand}/> )
          }

        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            disabled={!hasPrevious}
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded ${hasPrevious ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          >
            ◀️ Précédent
          </button>

          <span className="text-sm font-medium text-gray-600">Page {page}</span>

          <button
            disabled={!hasNext}
            onClick={() => setPage(prev => prev + 1)}
            className={`px-4 py-2 rounded ${hasNext ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          >
            Suivant ▶️
          </button>
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

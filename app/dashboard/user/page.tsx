'use client'

import LoadingOverlay from "@/components/base/LoadingOverlay";
import { Button } from "@/components/ui/button";
import ProfileUpdate from "@/components/user/ProfileUpdate";
import { UserDemandType } from "@/types/user";
import { askMember, getDemandStatus } from "@/utils/auth";
import { useAuth } from "@/utils/AuthContext";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";




const statusColor = {
  pending: 'bg-yellow-50 text-gray-900',
  accepted: 'bg-green-100 text-gray-900',
  refused: 'bg-red-100 text-gray-900',
};

const statusLabel = {
  pending: '⏳ En attente de validation',
  accepted: '✅ Acceptée',
  refused: '❌ Refusée',
};



const UserProfile = () => {
  const auth = useAuth();
  const [demand, setDemand] = useState<UserDemandType | null>(null);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  

  useEffect(()=> {
    const load = async () => {
      setDemand(await getDemandStatus())
      setLoading(false)
    }
    load()

  }, [])
  const demandIntercesseur = async () => {
    // TODO: implement API request
    setLoading(true)
    const {success, data}  = await askMember()
    if(success)
      setDemand(data)
    setLoading(false)
  };

  return (
    <div className="w-full mx-auto mt-12 px-4 sm:px-6 lg:px-8">

      {
        loading && <LoadingOverlay />
      }
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="flex flex-col items-center sm:flex-row sm:items-center  sm:space-x-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-3xl font-bold uppercase shadow-sm">
            {auth?.user?.first_name?.[0] || auth?.user?.username?.[0]}
          </div>

          {/* User Info */}
          <div className="mt-4 sm:mt-0 text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {auth?.user?.first_name} {auth?.user?.last_name}
            </h2>
            <p className="text-sm text-gray-500">@{auth?.user?.username}</p>
          </div>
        </div>
 
      </div>


      <div className="my-5 p-5 bg-white rounded-2xl shadow-2xl border-gray-100">
        {
          loading 
          &&
          <LoadingOverlay />
        }
        {/* Intercessor Status */}
        {auth?.isIntercesseur?
        (
          <div className="flex items-center justify-between">
              <p className="text-xs md:text-base">Vous êtes un membre de l'équipe d'intercession</p> 
              <CheckCheck color="green" className="w-4 h-4 md:w-6 md:h-6" />
          </div>
        )
        :
        
        demand?.state?
        (
          
            <div className={`p-4 rounded-md border shadow-sm ${statusColor[demand.state]}`}>
              <p className="font-semibold text-lg">Demande de Membre</p>
              <p className="mt-1">Soumise le : {new Date(demand.submitted_at).toLocaleDateString()}</p>
              <p className="mt-2 font-medium">{statusLabel[demand.state]}</p>
            </div>
        ):
        (
          <div className="flex justify-between items-center">
            <p className="text-gray-700 mb-3 text-xs  md:text-base">
              Faire une demande pour intégrer l'intercession
            </p>
            <Button
              onClick={() => demandIntercesseur()}
              className="bg-gray-600 text-xs md:text-base"
            >
              Soumettre
            </Button>
          </div>
        )
        }
      </div>
        {
          auth?.user &&
          <ProfileUpdate disabled={disableUpdate} setDisabled={setDisableUpdate} user={auth.user}/>
        }
      
    </div>
  );
};

export default UserProfile;

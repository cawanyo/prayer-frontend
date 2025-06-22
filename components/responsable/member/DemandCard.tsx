import { DemandStateType, UserDemandType } from '@/types/user';
import { updateDemand } from '@/utils/auth';
import { Check, Clock, XCircle } from 'lucide-react';
import React, {  useState } from 'react'


  
  const stateLabels : Record<DemandStateType, any>= {
    'pending': { label: "Pending", icon: <Clock className="w-4 h-4 mr-1" />, style: "bg-yellow-50 text-yellow-600", text_style: " bg-yellow-50 text-yellow-600 hover:bg-yellow-200" },
    'accepted': { label: "Accepted", icon: <Check className="w-4 h-4 mr-1" />, style: "bg-green-50 text-green-600", text_style: " bg-green-50 text-green-600 rounded hover:bg-green-200" },
    'refused': { label: "Refused", icon: <XCircle className="w-4 h-4 mr-1" />, style: "bg-red-50 text-red-600", text_style: "bg-red-50 text-red-600 rounded hover:bg-red-200" },
  };


interface DemandCardProps {
    initialDemand: UserDemandType;
  }
export default function DemandCard({initialDemand}: DemandCardProps) {
    const formattedDate = new Date(initialDemand.submitted_at).toLocaleDateString();
    const [demand, setDemand] = useState<UserDemandType>(initialDemand)
  const update = async (status: DemandStateType) => {
    demand.state = status;
    const data =  await updateDemand({demand: demand})
    if (data)
      setDemand(data)
  }


  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 space-y-4">
        <div className="flex justify-between items-start">
        <div>
            <p className="text-sm text-gray-500 italic  mb-1">
            <strong>From:</strong> {demand.requester?.username|| "Anonymous"}
            </p>
            <p className="text-xs text-gray-400 italic ">Submitted on {formattedDate}</p>
        </div>
        <div className="flex gap-2">
            <span className={`flex items-center w-20 md:w-24 justify-center px-2 py-1 rounded text-xs font-medium ${stateLabels[demand.state].style}`}>
            {stateLabels[demand.state].icon} {stateLabels[demand.state].label}
            </span>
        </div>
        </div>

        <div className="flex gap-2 text-xs">
        {
            (Object.entries(stateLabels) as [DemandStateType, any][]).map(([key, { label, icon, text_style }]) => (
                <button
                    key={key}
                    className={`px-2 py-1 flex items-center text-xs font-medium ${text_style}`}
                    onClick={() => {update(key)}}
                    >
                        {label}
                </button>
        ))}
        </div>
           
    </div>

  )
}

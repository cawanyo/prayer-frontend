'use client';

import { useEffect, useState } from 'react';
import { getUserRDV } from '@/utils/rdv';
import RDVForm from '@/components/responsable/rdv/RDVForm';
import Calendar from '@/components/availability/Calendar';
import RDVCalendarCell from '@/components/responsable/rdv/RDVCalendarCell';
import { CalendarProvider } from '@/components/calendar/CalendarContext';
import { RDVType } from '@/types/rdv';


export default function CreateRDVPage() {
    const [rdvs, setRdvs] = useState<RDVType[]>([]);
    const [unValidatedRdvs, setUnValidatedRdvs] = useState<RDVType[]>([]);
    useEffect(() => {
        const rdv = async () => {
            const {success, data} = await getUserRDV()
            if (success){
                const rdvData = data as RDVType[]
                setRdvs(data);
            }
        }
        rdv();
    }, []);
    
    useEffect(() => {
        setUnValidatedRdvs(rdvs.filter((rdv) => rdv.state === "pending" ))
    }, [rdvs])
  return (
    <CalendarProvider<RDVType> fullData={rdvs}>
        <div>
            <div className=' m-3 grid gap-3 lg:grid-cols-2'>
                <RDVForm  rdvs={rdvs} setRdvs={setRdvs}/>
                <div className=''>
                    <h1 className="text-2xl font-semibold mb-6">Vos rendez-vous validés</h1>

                    <Calendar>
                        {
                            (day) => <RDVCalendarCell day={day} />
                        }
                    </Calendar>
                </div>
            </div>
            
            <h1 className="text-xl font-semibold m-5 md:text-3xl">Vos rendez-vous pas encore validés</h1>
            <div className=' m-3 grid grid-cols-1 gap-3 lg:grid-cols-2'>
                {
                    unValidatedRdvs.map((rdv, index) => <RDVForm update={true} rdv={rdv} key={index} rdvs={rdvs} setRdvs={setRdvs}/>)
                }
            </div>
            
        </div>
    </CalendarProvider>
  );
}

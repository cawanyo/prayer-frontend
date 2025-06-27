'use client'
import Calendar from '@/components/availability/Calendar'
import LoadingOverlay from '@/components/base/LoadingOverlay';
import CalendarCell from '@/components/calendar/CalendarCell';
import { CalendarProvider } from '@/components/calendar/CalendarContext';
import PlainCalendarCell from '@/components/responsable/member/PlaningCalenderCell';
import { ProgramType } from '@/types/planing';
import { getProgramsByMonth } from '@/utils/planing';
import { useEffect, useState } from 'react';


export default function page() {
  const [data, setData] = useState<ProgramType[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const getProgram = async ()=> {

        const date = new Date()

        const {success, data} = await getProgramsByMonth({year:date.getFullYear(), month:date.getMonth()+1})

        if (success)
            setData(data)
        
        setLoading(false)
    }
    getProgram();
}, [])
  return (
    <div className=' flex flex-1'>
      {
        loading
        &&
        <LoadingOverlay />
      }
      <CalendarProvider<ProgramType> fullData={data} >
        <Calendar<ProgramType>  >
          {(day) => (
            <PlainCalendarCell key={day.toString()} day={day}  />
          )}
        </Calendar>
      </CalendarProvider>
    </div>
  )
}

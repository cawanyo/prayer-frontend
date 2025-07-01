'use client'
import Calendar from '@/components/availability/Calendar'
import LoadingOverlay from '@/components/base/LoadingOverlay';
import CalendarCell from '@/components/calendar/CalendarCell';
import { CalendarProvider } from '@/components/calendar/CalendarContext';
import PlainCalendarCell from '@/components/responsable/member/PlaningCalenderCell';
import { ProgramType } from '@/types/planing';
import { getProgramsByMonth } from '@/utils/planing';
import { useEffect, useState } from 'react';


export async function getData(date: Date) {
  const { success, data } = await getProgramsByMonth({ year: date.getFullYear(), month: date.getMonth() + 1 });
  if (success)
    return data as ProgramType[];
  return [];
}

export default function page() {
  const [data, setData] = useState<ProgramType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

}, [])
  return (
    <div className=' flex flex-1'>
      {
        loading
        &&
        <LoadingOverlay />
      }
      <CalendarProvider<ProgramType> getData={getData} >
        <Calendar<ProgramType>  >
          {(day) => (
            <PlainCalendarCell key={day.toString()} day={day}  />
          )}
        </Calendar>
      </CalendarProvider>
    </div>
  )
}

'use client'
import Calendar from '@/components/availability/Calendar'
import LoadingOverlay from '@/components/base/LoadingOverlay';
import CalendarCell from '@/components/calendar/CalendarCell';
import { CalendarProvider } from '@/components/calendar/CalendarContext';
import { AvailabilityType } from '@/types/availability';
import { getAvailabilityByMonth } from '@/utils/availability_request';
import { useEffect, useState } from 'react';


export default function page() {
  const [data, setData] = useState<AvailabilityType[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const getAvailabilities = async ()=> {

        const date = new Date()

        const {success, data} = await getAvailabilityByMonth({year:date.getFullYear(), month:date.getMonth()+1})

        if (success)
            setData(data)
        
        setLoading(false)
        console.log(data)
    }
    getAvailabilities();
}, [])
  return (
    <div className=' flex flex-1'>
      {
        loading
        &&
        <LoadingOverlay />
      }
      <CalendarProvider<AvailabilityType> fullData={data}>
        <Calendar >
          {(day) => (
            <CalendarCell key={day.toString()} day={day} />
          )}
        </Calendar>
      </CalendarProvider>
    </div>
  )
}

'use client'
import Calendar from '@/components/availability/Calendar'
import CalendarCell from '@/components/calendar/CalendarCell';
import { CalendarProvider } from '@/components/calendar/CalendarContext';


export default function page() {

  return (
    <div className=' flex flex-1'>
      <CalendarProvider>
      <Calendar >
        {(day) => (
          <CalendarCell key={day.toString()} day={day} />
        )}
      </Calendar>
      </CalendarProvider>
    </div>
  )
}

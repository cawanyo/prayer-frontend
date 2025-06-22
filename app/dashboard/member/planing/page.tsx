'use client'
import Calendar from '@/components/availability/Calendar'
import CalendarCell from '@/components/calendar/CalendarCell';
import { CalendarProvider } from '@/components/calendar/CalendarContext';
import PlainCalendarCell from '@/components/responsable/member/PlaningCalenderCell';


export default function page() {

  return (
    <div className=' flex flex-1'>
      <CalendarProvider>
      <Calendar >
        {(day) => (
          <PlainCalendarCell key={day.toString()} day={day}  />
        )}
      </Calendar>
      </CalendarProvider>
    </div>
  )
}

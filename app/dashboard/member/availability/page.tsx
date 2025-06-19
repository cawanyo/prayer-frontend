import MonthCalendar from '@/components/availability/Month'
import WeekCalendar from '@/components/availability/Week'
import React from 'react'

export default function page() {
  return (
    <div className=' flex flex-1'>
      <WeekCalendar />
      <MonthCalendar />
    </div>
  )
}

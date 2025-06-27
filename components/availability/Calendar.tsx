'use client'
import {
  format,
  parse
} from "date-fns";
import CalendarHeader from "../calendar/CalenderHeader";
import CalendarDayLabels from "../calendar/CalendarLabel";
import CalendarGrid from "../calendar/CalendarGrid";
import { useCalendar } from "../calendar/CalendarContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


type CalendarProps<T> = {
  children: (day: Date) => React.ReactNode; 
  data? : T[]
};

function Calendar<T>({children, data}: CalendarProps<T>) {
  const [calendarFormat, setCalendarFormat] = useState<"month"|"week">("week")
  const calendarContext = useCalendar();

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const parsed = parse(e.target.value, "yyyy-MM-dd", new Date());
  if (!isNaN(parsed.getTime())) {
    calendarContext.setCurrentDate(parsed);
    calendarContext.setSelectedDateKey(format(parsed, "yyyy-MM-dd"));
  }
  };

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 640? setCalendarFormat("week") : setCalendarFormat("month")
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
        onClick={() => calendarContext.setSelectedDateKey(null)}
        className=" p-6 bg-white max-w-4xl w-full mx-auto rounded-lg shadow text-xs sm:text-sm md:text-base sm:flex sm:flex-col"
        >
      <CalendarHeader calendarFormat={calendarFormat}/>

      <div className="mb-6 text-right">
        <input
          type="date"
          className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md px-3 py-2 text-sm shadow-sm"
          onChange={handleDatePickerChange}
        />
      </div>

      <div className={cn("", calendarFormat == "week" && "grid grid-cols-2 sm:flex sm:flex-col")}>
        <CalendarDayLabels currentDate={calendarContext.currentDate}/>

        <CalendarGrid
          calendarFormat={calendarFormat}
        >
           {children}
        </CalendarGrid>
      </div>
      
    </div>
  );
};


export default Calendar;

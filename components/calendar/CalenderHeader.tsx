import { addMonths, subMonths, subWeeks, format, startOfWeek, addWeeks } from "date-fns";
import { useCalendar } from "./CalendarContext";

interface Props {
  
  calendarFormat: 'week' | 'month'
}

export default function CalendarHeader({  calendarFormat }: Props) {
    const {setCurrentDate, currentDate} = useCalendar()
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => 
            setCurrentDate(calendarFormat === "month"? subMonths(currentDate, 1) :subWeeks(currentDate, 1))
        }
        className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200"
      >
        ◀ Prev
      </button>
      <div className="text-base font-bold text-gray-800 sm:text-xl ">
        {calendarFormat === "month" ?
            format(currentDate, "MMMM yyyy")
            :
            <span>Week of  {format(startOfWeek(currentDate), "MMM d, yyyy")}</span>
        }
      </div>
      <button
        onClick={() => 
            setCurrentDate(calendarFormat === "month"? addMonths(currentDate, 1): addWeeks(currentDate, 1))
        }
        className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200"
      >
        Next ▶
      </button>
    </div>
  );
}

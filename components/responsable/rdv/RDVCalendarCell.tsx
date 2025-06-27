import { format, isSameMonth } from "date-fns";
import { useEffect, useState } from "react";
import { useCalendar } from "@/components/calendar/CalendarContext";
import { getUserRDVByDate } from "@/utils/rdv";
import { RDVType } from "@/types/rdv";

interface Props {
  day: Date;
  children?: React.ReactNode,
}

export default function RDVCalendarCell({
  day,
}: Props) {

  const {selectedDateKey, currentDate, setSelectedDateKey} = useCalendar()
  const fullDateKey = format(day, "yyyy-MM-dd");
  const isSelected = selectedDateKey === fullDateKey;
  const isCurrentMonth = isSameMonth(day, currentDate);
  const dateNum = format(day, "d");
  const [rdv, setRdv] = useState<RDVType|null>(null)
  const calendarContext = useCalendar();
  useEffect(() => {
    const rdvs:RDVType[] = calendarContext.data
    const result = rdvs.find(rdv => rdv.date === fullDateKey);
    if(result)
      console.log("")
  }, [calendarContext.data])

  const onStatusChange =  async () => {

    setSelectedDateKey(null);
  }

  const baseClasses = `w-full h-16 p-2 border text-sm flex flex-col items-center justify-center transition-all duration-300 
  } ${isSelected ? "ring-2 ring-blue-400" : ""} ${
    fullDateKey === "unavailable"
      ? "bg-red-100"
      : fullDateKey === "available"
      ? "bg-green-100"
      : "hover:bg-blue-50"
  }`;

  return (
    <div className={baseClasses} onClick={(e) => {
      e.stopPropagation();
      setSelectedDateKey(fullDateKey);
    }}>
      <span className="font-medium mb-1">{dateNum}</span>
      {isSelected ? (
        <div className="flex flex-col gap-1 mt-1 w-full">
          
        </div>
      ) : (
        <span className="font-medium mb-1 text-[8px]"></span>
      )}
    </div>
  );
}

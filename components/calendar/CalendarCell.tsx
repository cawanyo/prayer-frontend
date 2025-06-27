import { CheckCircle, XCircle } from "lucide-react";
import { format, isSameMonth } from "date-fns";
import { useCalendar } from "./CalendarContext";
import { useContext, useEffect, useState } from "react";
import { getAvailability, upsertAvailability } from "@/utils/availability_request";
import LoadingOverlay from "../base/LoadingOverlay";
import { AvailabilityType } from "@/types/availability";

interface Props {
  day: Date;
  children?: React.ReactNode,
}

export default function CalendarCell({
  day,
}: Props) {

  const {selectedDateKey, currentDate, setSelectedDateKey} = useCalendar()
  const fullDateKey = format(day, "yyyy-MM-dd");
  const isSelected = selectedDateKey === fullDateKey;
  const isCurrentMonth = isSameMonth(day, currentDate);
  const dateNum = format(day, "d");
  const [status, setStatus] = useState<"available"|"unavailable"| null>(null)
  const calendarContext = useCalendar()



  useEffect(() => {
    const availabilities:AvailabilityType[] = calendarContext.data
    const result = availabilities.find(availability => availability.date === fullDateKey);
    if(result)
      setStatus(result.state? "available": "unavailable")
  }, [calendarContext.data])

  const onStatusChange =  async (status: "available" | "unavailable") => {
    const {success, data} = await upsertAvailability({'date': fullDateKey, state: status === "available" })
    if (success)
      setStatus(status)
    setSelectedDateKey(null);
  }

  const baseClasses = `w-full h-16 p-2 border text-sm flex flex-col items-center justify-center transition-all duration-300 ${
    !isCurrentMonth ? "text-gray-400 bg-gray-50" : "text-gray-800"
  } ${isSelected ? "ring-2 ring-blue-400" : ""} ${
    status === "unavailable"
      ? "bg-red-100"
      : status === "available"
      ? "bg-green-100"
      : "hover:bg-blue-50"
  }`;

  return (
    <div className={baseClasses} onClick={(e) => {
      e.stopPropagation();
      setSelectedDateKey(fullDateKey);
    }}>
      {/* {loading
        &&
        <LoadingOverlay />
      } */}
      {isSelected ? (
        <div className="flex flex-col gap-1 mt-1 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange( "available");
            }}
            className="text-xs bg-green-500 text-white rounded px-2 py-1 h-[50%] hover:bg-green-600"
          >
            <CheckCircle className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange( "unavailable");
            }}
            className="text-xs bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
          >
            <XCircle className="w-4 h-4 mx-auto" />
          </button>
        </div>
      ) : (
        <span className="font-medium mb-1">{dateNum}</span>
      )}
    </div>
  );
}

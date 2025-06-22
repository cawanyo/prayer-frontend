import { CheckCircle, XCircle } from "lucide-react";
import { format, isSameMonth } from "date-fns";
import { useCalendar } from "./CalendarContext";
import { useEffect, useState } from "react";
import { getAvailability, upsertAvailability } from "@/utils/availability_request";

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

  useEffect(() => {
    const getState = async () => {
      const res = await getAvailability({'date':fullDateKey})
      if (res.state != null)
        setStatus(res.state? "available": "unavailable")
    } 
    getState()
  }, [])

  const onStatusChange =  async (status: "available" | "unavailable") => {
    const res = await upsertAvailability({'date': fullDateKey, state: status === "available" })
    if (res)
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

'use client'
import React, { useEffect, useState } from "react";
import {
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  format,
  parse,
} from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import { getMonthAvailability, upsertAvailability } from "@/utils/availability_request";

interface CalendarStatusMap {
  [key: string]: "available" | "unavailable";
}

interface CustomCalendarProps {
  onDateSelect?: (date: Date, status: "available" | "unavailable") => void;
  initialStatuses?: CalendarStatusMap;
}


const WeekCalendar: React.FC<CustomCalendarProps> = ({ onDateSelect, initialStatuses = {} }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<CalendarStatusMap>({});


  useEffect(() => {
    setStatuses(initialStatuses);
    const month = Number(format(currentDate, 'MM'));
    const year = Number(format(currentDate, 'yyyy'));
    
    const getStates = async () => {
      const stateList: any[] = await getMonthAvailability({'month': month, 'year': year})
      const stateCalendar = stateList.reduce((acc, row) => {
                            acc[row.date] = row.state? "available": "unavailable"; 
                            return acc
                          }, {})
      setStatuses(stateCalendar)
    } 
    getStates()
  }, [currentDate]);

  const handleStatusChange = (dateKey: string, status: "available" | "unavailable") => {
    setStatuses((prev) => ({ ...prev, [dateKey]: status }));
    try{
      upsertAvailability({'date': dateKey, state: status === "available" })
    }
    catch{

    }
    if (onDateSelect) onDateSelect(parse(dateKey, "yyyy-MM-dd", new Date()), status);
    setSelectedDateKey(null); // Hide buttons after selection
  };


  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
        className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200 transition"
      >
        ◀ Prev
      </button>
      <div className="text-xl font-bold text-gray-800">
        Week of {format(startOfWeek(currentDate), "MMM d, yyyy")}
      </div>
      <button
        onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
        className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200 transition"
      >
        Next ▶
      </button>
    </div>
  );


  const renderCellsWithDays = () => {
    const startDate = startOfWeek(currentDate);
    const rows = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const dayLabel = format(day, "EEE");
      const formattedDate = format(day, "d");
      const fullDateKey = format(day, "yyyy-MM-dd");
      const status = statuses[fullDateKey];
      const isSelected = selectedDateKey === fullDateKey;

      const cellClasses = `w-full h-24 sm:h-28 md:h-32 text-center p-2 border text-sm flex items-center justify-center transition-all duration-300 text-gray-800 ${
        isSelected ? "ring-2 ring-blue-400" : ""
      } ${
        status === "unavailable" ? "bg-red-100" : status === "available" ? "bg-green-100" : "hover:bg-blue-50"
      }`;

      rows.push(
        <div key={day.toString()} className="grid grid-cols-4  gap-2 items-center">
          <div className="text-center font-semibold text-gray-600 uppercase text-sm">
            {dayLabel} 
          </div>
          <div
            className={cellClasses + " col-span-3 sm:col-span-6"}
            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDateKey(fullDateKey);                
                            }}
          >
            {isSelected ? (
              <div className="flex flex-col w-full h-full justify-center items-center gap-2 transition-all duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(fullDateKey, "available");
                    
                  }}
                  className="w-11/12 text-xs bg-green-500 text-white rounded py-2 hover:bg-green-600 flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(fullDateKey, "unavailable");
                  }}
                  className="w-11/12 text-xs bg-red-500 text-white rounded py-2 hover:bg-red-600 flex items-center justify-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="font-medium mb-1">{formattedDate}</span>
                {status && (
                  <span className="text-xs mt-1 capitalize text-gray-700 flex items-center gap-1">
                    {status === "available" ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
        {rows}
      </div>
    );
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parse(e.target.value, "yyyy-MM-dd", new Date());
    if (!isNaN(parsed.getTime())) {
      setCurrentDate(parsed);
      setSelectedDateKey(format(parsed, "yyyy-MM-dd"));
    }
  };

  return (
    <div 
        onClick={() => setSelectedDateKey(null)}
        className="p-6 bg-white max-w-3xl w-full mx-auto rounded-lg shadow text-xs sm:text-sm sm:hidden">
      {renderHeader()}

      <div className="mb-6 text-right">
        <input
          type="date"
          className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md px-3 py-2 text-sm shadow-sm"
          onChange={handleDatePickerChange}
        />
      </div>

      {renderCellsWithDays()}
    </div>
  );
};

export default WeekCalendar;

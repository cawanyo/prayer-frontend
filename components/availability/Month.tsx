'use client'
import React, { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
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

const MonthCalendar: React.FC<CustomCalendarProps> = ({ onDateSelect, initialStatuses = {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<CalendarStatusMap>({});


  useEffect(() => {
    setStatuses(initialStatuses);
    const month = Number(format(currentMonth, 'MM'));
    const year = Number(format(currentMonth, 'yyyy'));
    
    const getStates = async () => {
      const stateList: any[] = await getMonthAvailability({'month': month, 'year': year})
      const stateCalendar = stateList.reduce((acc, row) => {
                            acc[row.date] = row.state? "available": "unavailable"; 
                            return acc
                          }, {})
      setStatuses(stateCalendar)
    } 
    getStates()
  }, [currentMonth]);

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200"
      >
        ◀ Prev
      </button>
      <div className="text-xl font-bold text-gray-800">
        {format(currentMonth, "MMMM yyyy")}
      </div>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200"
      >
        Next ▶
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-gray-600 uppercase text-sm">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2 text-sm">{days}</div>;
  };

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

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const fullDateKey = format(day, "yyyy-MM-dd");
        const isCurrentMonth = isSameMonth(day, monthStart);
        const status = statuses[fullDateKey];

        const isSelected = selectedDateKey === fullDateKey;

        const cellClasses = `w-full h-16 text-center p-2 border text-sm flex flex-col items-center justify-center transition-all duration-300  ${
          !isCurrentMonth ? "text-gray-400 bg-gray-50" : "text-gray-800"
        } ${isSelected ? "ring-2 ring-blue-400" : ""} ${
          status === "unavailable" ? "bg-red-100" : status === "available" ? "bg-green-100" : "hover:bg-blue-50"
        }`;

        days.push(
          <div
            key={day.toString()}
            className={cellClasses}
            onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDateKey(fullDateKey)
                }}
          >
            
            {isSelected ? (
              <div className="flex flex-col gap-1 mt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(fullDateKey, "available");
                  }}
                  className="text-xs bg-green-500 text-white rounded px-2 py-1 h-[50%] hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(fullDateKey, "unavailable");
                  }}
                  className="text-xs bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                >
                  <XCircle className="w-4 h-4" /> 
                </button>
              </div>
            ) :
            <span className="font-medium mb-1">{formattedDate}</span>
            }
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parse(e.target.value, "yyyy-MM-dd", new Date());
    if (!isNaN(parsed.getTime())) {
      setCurrentMonth(parsed);
      setSelectedDateKey(format(parsed, "yyyy-MM-dd"));
    }
  };

  return (
    <div 
        onClick={() => setSelectedDateKey(null)}
        className="hidden p-6 bg-white max-w-3xl w-full mx-auto rounded-lg shadow text-xs sm:text-sm md:text-base sm:flex sm:flex-col"
        >
      {renderHeader()}

      <div className="mb-6 text-right">
        <input
          type="date"
          className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md px-3 py-2 text-sm shadow-sm"
          onChange={handleDatePickerChange}
        />
      </div>

      {renderDays()}
      {renderCells()}
    </div>
  );
};


export default MonthCalendar;

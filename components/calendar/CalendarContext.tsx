'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
export type CalendarStatus = 'available' | 'unavailable';

export interface CalendarStatusMap {
  [dateKey: string]: CalendarStatus;
}

interface CalendarContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDateKey: string | null;
  setSelectedDateKey: (dateKey: string | null) => void;
}


const CalendarContext = createContext<CalendarContextType | undefined>(undefined);


export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  
    return (
      <CalendarContext.Provider
        value={{
          currentDate,
          setCurrentDate,
          selectedDateKey,
          setSelectedDateKey,
        }}
      >
        {children}
      </CalendarContext.Provider>
    );
  };
  
  export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) throw new Error("useCalendar must be used within a CalendarProvider");
    return context;
  };
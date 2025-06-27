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
  data: any,
  setData: (d:any) => void,
  loading: boolean,
  setLoading: (l:boolean) => void
}


const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface props<T> { 
  children: React.ReactNode, 
  fullData?: T[]
}

export function CalendarProvider<T>({ children, fullData }: props<T>) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [data, setData] = useState<T[] | undefined>(fullData? fullData : []);
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setLoading(true);
    setData(fullData);
    setLoading(false);
  }, [fullData])

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        selectedDateKey,
        setSelectedDateKey,
        data,
        setData,
        loading,
        setLoading
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
  
  export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) throw new Error("useCalendar must be used within a CalendarProvider");
    return context;
  };
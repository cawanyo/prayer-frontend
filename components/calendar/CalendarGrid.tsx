import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import CalendarCell from "./CalendarCell";
import { useCalendar } from "./CalendarContext";
import { cn } from "@/lib/utils";

type Props = {
  calendarFormat: "month" | "week";
  children: (day: Date) => React.ReactNode;
};

export default function CalendarGrid({
    calendarFormat,
    children
}: Props) {
    const {  
        currentDate,
    } = useCalendar();
  

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  let day:Date = calendarFormat == "week"? startOfWeek(currentDate) : startDate;

  const rows = [];

  while (day <= endDate) {
    const days = [];

    for (let i = 0; i < 7; i++) {

      days.push(
        <div key={day.toString()}>
            {children(day)}
        </div>
        
      );
      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toString()} className={cn("grid", calendarFormat=="week" ? "grid-rows-7 sm:grid-cols-7" : "grid-cols-7")}>
        {days}
      </div>
    );
    if (calendarFormat == "week")
        break
  }

  return <div>{rows}</div>;
}

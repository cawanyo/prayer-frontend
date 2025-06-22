import { addDays, format, startOfWeek } from "date-fns";

export default function CalendarDayLabels({ currentDate }: { currentDate: Date }) {
  const startDate = startOfWeek(currentDate);
  return (
    <div className="grid grid-rows-7 sm:grid-cols-7 sm:grid-rows-1 mb-2 text-sm">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="text-center self-center font-semibold text-gray-600 uppercase text-sm"
        >
          {format(addDays(startDate, i), "EEE")}
        </div>
      ))}
    </div>
  );
}
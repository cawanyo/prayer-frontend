'use client'
import { ProgramType } from "@/types/planing";
import { useAuth } from "@/utils/AuthContext";
import { getProgramFunction } from "@/utils/planing";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import PlaningModal from "../planing/Modal";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

type Props = {
  day: Date;

};

export default function PlainCalendarCell({
  day,
}: Props) {
    const auth = useAuth();
    const [program, setProgram] = useState<ProgramType|null>(null);
    const fullDateKey = format(day, "yyyy-MM-dd");
    const [open, setOpen] = useState(false);
    const colorList = ['bg-yellow-100', 'bg-red-100', 'bg-green-100'];
    useEffect(()=>{
        const getProgram = async ()=> {
          
            const {success, data} = await getProgramFunction({date: fullDateKey})
            if (success)
                setProgram(data)
        }
        getProgram();
    }, [])

    const onClick = () => {
      if (auth?.isResponsable){
        setOpen(true);
      }
    }
  return (
    <>
    <div 
        className={cn("h-28 p-1 border rounded bg-white shadow-sm gap-y-1 hover:bg-blue-50 transition flex flex-col justify-between", program && colorList[Math.floor(Math.random() * colorList.length)])}
        onClick={(e) => { onClick()}}
    
    >
      <div className="text-xs text-gray-500 mb-1" >{format(day, "MMM d")}</div>

      {program ? (
        <div className="flex flex-1  gap-1 flex-col justify-around text-sm text-gray-800 ">
          <span className="font-semibold text-[13px] sm:text-[9px] md:text-xs">{program.name}</span>
          <div className=" flex flex-col">
            <span className="text-gray-600 text-[13px] sm:text-[8px] lg:text-xs">
              {program.start_time.slice(0,5)} - {program.end_time.slice(0,5)}
            </span>
            <div className="text-gray-600 text-xs italic  flex flex-row items-center gap-1"> <Circle className="w-1 h-1" color="green" />{program.person?.username}</div>
          </div>
        </div>
      ) : (
        <div className="text-gray-300 text-sm italic mt-2"></div>
      )}
    </div>
    <PlaningModal open={open} setOpen={setOpen} day={day} program={program} setProgram={setProgram}/>
    
    </>
  );
}

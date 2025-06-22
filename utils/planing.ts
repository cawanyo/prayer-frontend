import { ProgramType } from "@/types/planing";

export const getProgramFunction = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/planing/program/${date}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if(res.ok){
            const data = await res.json();
            return data
        }
    } catch (error) {
      return null;
    }
}


export const addProgramm = async (program: ProgramType) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/planing/program`, {
        method: 'POST',
        body: JSON.stringify(
            {
                person: program.person? program.person.id : null,
                name: program.name,
                date: program.date,
                start_time: program.start_time,
                end_time: program.end_time
            }
        ),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
       
        const data = await res.json();
        console.log(data)
        return data
    } catch (error) {
      return null;
    }
  }

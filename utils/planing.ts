import { api } from "@/lib/utils";
import { ProgramType } from "@/types/planing";

export const getProgramFunction = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/planing/program/${date}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if(!res.ok)
            throw new Error(res.statusText)

        const data = await res.json();
        return {success: true, data:data}
    } catch (error) {
      return {success: false, data:null, error:error};
    }
}

export const getProgramsByMonth = async ({year, month}: {year:number, month:number}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/planing/program/${year}/${month}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if(!res.ok)
            throw new Error(res.statusText)

        const data = await res.json();
        console.log(data)
        return {success: true, data:data}
    } catch (error) {
      return {success: false, data:null, error:error};
    }
}


export const addProgramm = async (program: ProgramType) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/planing/program`, {
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

        return {success: true, data:data}
    } catch (error) {
      return {success: false, data:null, error:error};
    }
  }

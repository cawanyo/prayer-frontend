import { api } from "@/lib/utils";

export const upsertAvailability = async ({date, state}: {date:string, state: boolean}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`${api}/availability/${date}/upsert/`, {
        method: 'PATCH',
        body: JSON.stringify({
            'state': state
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
        if(!res.ok)
            throw new Error(res.statusText)
       
        const data = await res.json();
        return {success: true, data:data}

    } catch (error) {
      return {success: true, data:null, error:error};
    }
  }


export const getAvailability = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/availability/${date}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        if(!res.ok)
            throw new Error('Error')

        const data = await res.json();
        return {success: true, data:data}
    } catch (error) {
      return {success: true, data:null, error:error};
    }
}

export const getAvailableUsers = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/availability/users/${date}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        const data = await res.json();
        return {success: true, data:data}
    } catch (error) {
      return {success: false, data:null, error:error};
    }
}
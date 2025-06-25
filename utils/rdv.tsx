import { RestrictedRDVType } from "@/types/rdv";

export const addRDV = async (rdv: RestrictedRDVType) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/rdv/create/`, {
        method: 'POST',
        body: JSON.stringify(rdv),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(await res.json())
        if (!res.ok) throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return data
    } catch (error) {
      return null;
    }
  }

export const getUserRDV = async () => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/rdv/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        if (!res.ok) throw new Error("Failed to Load RDV");
        const data = await res.json();
        
        return data
    } catch (error) {
      return [];
    }
}

export const getUserRDVByDate = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/rdv/date/2001-06-24`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        if (!res.ok) throw new Error("Failed to Load RDV");
        const data = await res.json();
        
        return data
    } catch (error) {
      return [];
    }
}


export const updateRDV = async (rdv: RestrictedRDVType, id:number) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/rdv/${id}/update/`, {
        method: 'PATCH',
        body: JSON.stringify(rdv),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(await res.json())
        if (!res.ok) throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return data
    } catch (error) {
      return null;
    }
  }

  export const deleteAvailability = async (id:number) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/rdv/availability/${id}/`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(await res.json())
        if (!res.ok) throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return data
    } catch (error) {
      return null;
    }
  }

  export const deleteRDV = async (id:number) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/rdv/delete/${id}/`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(await res.json())
        if (!res.ok) throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return data
    } catch (error) {
      return null;
    }
  }


  export const getAllRDV = async () => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/rdv/all/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        if (!res.ok) throw new Error("Failed to Load RDV");
        const data = await res.json();
        
        
        return data
    } catch (error) {
      console.log('error')
      return [];
    }
}
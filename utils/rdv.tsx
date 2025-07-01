import { api } from "@/lib/utils";
import { RestrictedRDVType } from "@/types/rdv";

export const addRDV = async (rdv: RestrictedRDVType) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/rdv/create/`, {
        method: 'POST',
        body: JSON.stringify(rdv),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
        if (!res.ok) 
          throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return {success: true, data:data}
    } catch (error) {
      return {success: false, data:null};
    }
  }

export const getUserRDV = async () => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/rdv/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        if (!res.ok) throw new Error("Failed to Load RDV");
        const data = await res.json();
        return {success: true, data:data.results}
    } catch (error) {
      return {success:true, data:[], error:error};
    }
}

export const getUserRDVByDate = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/rdv/date/${date}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        if (!res.ok)
           throw new Error("Failed to Load RDV");
        const data = await res.json();
        
        return {success:true, data:data}
    } catch (error) {
      return {success:false, data:null};
    }
}


export const updateRDV = async (rdv: RestrictedRDVType, id:number) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/rdv/${id}/update/`, {
        method: 'PATCH',
        body: JSON.stringify(rdv),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
        if (!res.ok) throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return {success: true, data:data}
    } catch (error) {
      return {success:false, data:null, error:error};
    }
  }

  export const deleteAvailability = async (id:number) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/rdv/availability/${id}/`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return {success: true, data:data}
    } catch (error) {
      return {success: false, data:null, error:error};
    }
  }

  export const deleteRDV = async (id:number) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/rdv/delete/${id}/`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(await res.json())
        if (!res.ok) throw new Error("Failed to submit RDV");
        const data = await res.json();
        
        return {success: true, data:data}
    } catch (error) {
      return {success: false, data:null, error:error};
    }
  }


  export const getAllRDV = async () => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${api}/rdv/all/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        if (!res.ok) throw new Error("Failed to Load RDV");
        const data = await res.json();
        
        
        return {success: true, data:data};
    } catch (error) {
      console.log('error')
      return {success: false, data:[], error:error};;
    }
}
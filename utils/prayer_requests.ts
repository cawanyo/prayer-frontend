import { api } from "@/lib/utils";
import { PrayerRequestType } from "@/types/prayer";
import { _success } from "zod/v4/core";

export const allPrayers = async () => {
  try{
  
      const token = localStorage.getItem('access_token');

      const res = await fetch(`${api}/prayers/list`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
      });
      if(!res.ok)
        throw new Error(res.statusText)

      const prayers = await res.json();
      return {success:true, data:prayers}
  } catch (error) {
    return {_success:false, data:[], error:error};
  }
}

export const addPrrayerFunction = async (prayer:  PrayerRequestType) => {
  try {
    const res = await fetch(`${api}/prayers/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...prayer,
        user: prayer.user? prayer.user.id : null,
        category: null, // Adjust to match actual category ID,
        state: 'pending'
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to submit prayer");
    }

    
    return {success: true, data: await res.json()};

  } catch (err: any) {
    return {success:false, data:null}
  } 

}
export const getMyPrayers = async () => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`${api}/prayers/me/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if(!res.ok){
          throw new Error(res.statusText)
        }
       
        const prayers = await res.json();
        
        return {success: true, data:prayers}
    } catch (error) {
      return {success:false, data:[]};
    }
  }


  export const getPrayerComment= async ({prayer_id}: {prayer_id:number}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`${api}/prayers/${prayer_id}/comments/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
       if(!res.ok)
          throw new Error(res.statusText)

      const comments = await res.json();
      return {success: true, data:comments}
    } catch (error) {
      return {success:false, data:[], error:error};
    }
  }


  export const submitComment = async ({prayer_id, content, submiter_name}: {prayer_id:number, content:string, submiter_name: string}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`${api}/prayers/${prayer_id}/comments/`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            'content': content,
            'submiter_name': submiter_name
          })
          });
      
        const comment = await res.json();

        if (!res.ok)
          throw new Error(res.statusText)

        return {success: true, data:comment}
    } catch (error) {
      return {success: false, error:error}
    }
  }

  export const updatePrayerState = async ({prayer_id, state}: {prayer_id:number, state:  'pending' | 'answered' | 'failed'}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`http://127.0.0.1:8000/api/prayers/${prayer_id}/update-state/`, {
          method: "PATCH",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            'state': state 
          })
          });
      
          if(!res.ok)
            throw new Error(res.statusText);

        const data = await res.json();
        return {data:data, success: true}
    } catch (error) {
      return {success: false, error:error};
    }
  }
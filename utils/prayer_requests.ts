import { PrayerRequestType } from "@/types/prayer";

export const allPrayers = async () => {
  try{
  
      const token = localStorage.getItem('access_token');

      const res = await fetch('http://127.0.0.1:8000/api/prayers/list', {
      headers: {
          Authorization: `Bearer ${token}`,
      },
      });
     
      const prayers = await res.json();
      console.log(prayers)
      return prayers
  } catch (error) {
    return [];
  }
}

export const addPrrayerFunction = async (prayer:  PrayerRequestType) => {
  try {
    console.log('enter')
    const res = await fetch("http://127.0.0.1:8000/api/prayers/", {
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

    console.log(res)
    return res;

  } catch (err: any) {
    return null
  } 

}
export const getMyPrayers = async () => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/prayers/me/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
       
        const prayers = await res.json();
        return prayers
    } catch (error) {
      return [];
    }
  }


  export const getPrayerComment= async ({prayer_id}: {prayer_id:number}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`http://127.0.0.1:8000/api/prayers/${prayer_id}/comments/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
       
        const prayers = await res.json();
        return prayers
    } catch (error) {
      return [];
    }
  }


  export const submitComment = async ({prayer_id, content, submiter_name}: {prayer_id:number, content:string, submiter_name: string}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`http://127.0.0.1:8000/api/prayers/${prayer_id}/comments/`, {
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
        console.log(comment)
        return comment
    } catch (error) {
      return ;
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
      
        const data = await res.json();
        console.log(data)
        return data
    } catch (error) {
      return ;
    }
  }
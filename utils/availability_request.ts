export const upsertAvailability = async ({date, state}: {date:string, state: boolean}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch(`http://127.0.0.1:8000/api/availability/${date}/upsert/`, {
        method: 'PATCH',
        body: JSON.stringify({
            'state': state
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
       
        const data = await res.json();
        return data
    } catch (error) {
      return null;
    }
  }


export const getAvailability = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/availability/${date}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        const data = await res.json();
        return data
    } catch (error) {
      return null;
    }
}

export const getAvailableUsers = async ({date}: {date:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/availability/users/${date}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        const data = await res.json();
        return data
    } catch (error) {
      return null;
    }
}
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
        console.log(data)
        return data
    } catch (error) {
      return [];
    }
  }


export const getMonthAvailability = async ({month, year}: {month:number, year: number}) => {
    try{
    
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/availability/${year}/${month}/`, {
        method: 'GET',
    
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
       
        const data = await res.json();
        console.log(data)
        return data
    } catch (error) {
      return [];
    }
}
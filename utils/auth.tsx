


export const loginUser = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data || 'Login failed');
      }
      return { success: true, data: data };

    } catch (error) {
      return { success: false, error: error };
    }
  };


  export const createUser = async (credentials: { username: string; password: string, first_name: string, last_name:string, phone?:string, email:string }) => {
    try{
        const response = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data || 'SignUp failed');
        }  
        return { success: true, data:data};

    } catch (error) {
      return { success: false, error: error };
    }
  }

  export const updateMe = async ({ last_name, first_name, email, phone}: {last_name:string, first_name:string, email:string, phone?:string}) => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/accounts/me/update/', {
          method: "PATCH",
        headers: {
          "Content-Type": "application/json" ,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          last_name:last_name,
          first_name: first_name,
          email: email,
          phone: phone? phone : ""
        })
        });
  
        const userData = await res.json();
        return userData
    } catch (error) {
      return null;
    }
  }


  export const getMe = async () => {
    try{
    
        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/accounts/me/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
  
        const userData = await res.json();
        return userData
    } catch (error) {
      return null;
    }
  }



  export const getAccessToken = async ({refresh}: {refresh: string}) => {
    try{
        const res = await fetch("http://127.0.0.1:8000/api/accounts/token/refresh/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await res.json();
        return data.access
    } catch (error) {
      return null;
    }
  }

  export const isIntercesseurFunction = async () => {
    try{

        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/accounts/is-intercesseur/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await res.json();
        return data.is_intercesseur;
    } catch (error) {
      return null;
    }
  }


  export const isResponsableFunction = async () => {
    try{

        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/accounts/is-responsable/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await res.json();
        return data.is_responsable;
    } catch (error) {
      return null;
    }
  }



  
  export const askMember = async () => {
    try{

        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/accounts/demands/', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await res.json();
        return data;
    } catch (error) {
      return null;
    }
  }

  export const getDemandList = async () => {
    try{

        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/accounts/list-demands/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
      return null;
    }
  }

  export const updateDemand = async ({demand}: any) => {
    try{

        const token = localStorage.getItem('access_token');
        console.log(demand)
        const res = await fetch(`http://127.0.0.1:8000/api/accounts/demands/${demand.id}/`, {
          method:'PATCH',
          headers: {
             "Content-Type": "application/json" ,
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(demand),
          });

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
      return null;
    }
  }

  export const getDemandStatus = async () => {
    try{

        const token = localStorage.getItem('access_token');

        const res = await fetch('http://127.0.0.1:8000/api/accounts/demands/status', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        const data = await res.json();
        return data;
    } catch (error) {
      return null;
    }
  }

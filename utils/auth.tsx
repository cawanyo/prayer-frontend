


export const loginUser = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
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
        return { success: true};

    } catch (error) {
      return { success: false, error: error };
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
// context/AuthContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { getAccessToken, getMe, isIntercesseurFunction, isResponsableFunction } from './auth';
import { UserType } from '@/types/user';
import { useRouter } from 'next/navigation';


  interface DecodeType {
    user_id: string,
    [key: string]: any;
  }

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  decode: DecodeType | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  loading: boolean;
  isIntercesseur: boolean;
  isResponsable: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null> (null);
    const [decode, setDecode] = useState<DecodeType | null >(null);
    const [loading, setLoading] = useState(true);
    const [isIntercesseur, setIsIntercesseur] = useState(false);
    const [isResponsable, setIsResponsable] = useState(false);
    const router = useRouter()

    useEffect(() => {
      setLoading(true);
      const setUp = async() =>{
      const access_token =  localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');
      if (access_token && refresh_token) {
          try {
          const decoded: any = jwtDecode(access_token);
          setDecode(decoded);

          const now = Date.now() / 1000; 
          const remainingTime = decoded.exp - now;
          if(remainingTime>0){
            setUser(await getMe());
            setIsIntercesseur(await isIntercesseurFunction());
            setIsResponsable(await isResponsableFunction())
          }
          else{
            const new_access = await getAccessToken({'refresh':refresh_token})
            if(new_access){
              login(new_access, refresh_token)
            }
          }
          }
          catch {
            logout();
          }
          finally{
            setLoading(false)
          }
      }}
      setUp();


      const checkAndRefreshToken = async () => {
        const access_token = localStorage.getItem("access_token");
        if (!access_token) return;
        const decoded:any = jwtDecode(access_token);
        const now = Date.now() / 1000;
        
        if (decoded.exp - now < 60) {
          // token expires in less than a minute
          try {
            const refresh_token = localStorage.getItem("refresh_token");
            if (!refresh_token) throw new Error("No refresh token found");

            const new_token = await getAccessToken({refresh:refresh_token})
            if(new_token)localStorage.setItem("access_token", new_token);
            else logout();
          } catch {
            logout(); 
          }
        }
      };

      const interval = setInterval(checkAndRefreshToken, 60000);
      return () => clearInterval(interval);

        
    }, []);
  
    const login = async (access: string, refresh: string) => {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      const decoded: any = jwtDecode(access);
      setDecode(decoded);
      setUser(await getMe())
      setIsIntercesseur(await isIntercesseurFunction())
      setIsResponsable(await isResponsableFunction())
    }
  
    const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setDecode(null);
      router.replace('/')

    };
  
    const value: AuthContextType = {
      isAuthenticated: !!user,
      user,
      decode,
      login,
      logout,
      loading,
      isIntercesseur,
      isResponsable
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  

  export const useAuth = () => useContext(AuthContext);

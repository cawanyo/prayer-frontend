// context/AuthContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { getMe } from './auth';


interface UserType {
    id: string;
    username: string;
    email?: string;
    first_name?: string;
    last_name?:string;
    phone?:string,
    exp?: number;
    [key: string]: any;
  }

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
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null> (null);
    const [decode, setDecode] = useState<DecodeType | null >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
        const setUp = async() =>{
        const token =  localStorage.getItem('access_token');
        if (token) {
            try {
            const decoded: any = jwtDecode(token);
            setDecode(decoded);

            const now = Date.now() / 1000; 
            const remainingTime = decoded.exp - now;
            if(remainingTime>0){
              setUser(await getMe())
              const logoutTimeout = setTimeout(() => {
                logout();
              }, remainingTime * 1000);
              return () => clearTimeout(logoutTimeout);
            }      
            }
            catch {
              logout();
            
            }
        }}
        setUp()
        setLoading(false);
    }, []);
  
    const login = async (access: string, refresh: string) => {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      const decoded: any = jwtDecode(access);
      setDecode(decoded);
      setUser(await getMe())

    }
  
    const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setDecode(null);
    };
  
    const value: AuthContextType = {
      isAuthenticated: !!user,
      user,
      decode,
      login,
      logout,
      loading
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  

  export const useAuth = () => useContext(AuthContext);

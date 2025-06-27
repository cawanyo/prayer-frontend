import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const api2 ='http://localhost:8001/api'
export const api ='https://prayer-backend-j461.onrender.com/api'
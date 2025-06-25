'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderContent} from "@/constants";
import { useAuth } from "@/utils/AuthContext";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
// Mocked auth state (replace with real auth logic)


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4  py-3 flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-700 rounded-sm" />
          <span className="text-lg font-semibold text-gray-900">Prayer App</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex space-x-6 text-sm text-gray-700">
          {
            HeaderContent(auth?.isAuthenticated).map((type, index) => <Link href={type.href} key={index} className="hover:text-blue-700">{type.name}</Link> )
          }
        </nav>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          {
            auth?.isAuthenticated && 
              <div className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                <Bell className="w-5 h-5 text-gray-700" />
               </div>
          }
          
          <div>
            {
              auth?.isAuthenticated?
              <Button 
                className="bg-red-100 text-red-500 cursor-pointer text-xs hover:bg-red-200 "
                onClick={() => auth?.logout()}>
                Logout
              </Button>
            :
              <Button
                className="bg-blue-100 text-blue-500 cursor-pointer text-xs hover:bg-blue-200 "
                onClick={() => router.push('/auth')}
              >
                Login
              </Button>
            }
            
              
            
          </div>
          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-md focus:outline-none hover:bg-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden px-4 pb-4 flex flex-col space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {
              HeaderContent(auth?.isAuthenticated).map((type, index) => <Link href={type.href} key={index} className="hover:text-blue-700">{type.name}</Link> )
            }
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

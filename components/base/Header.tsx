'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderType } from "@/constants";
// Mocked auth state (replace with real auth logic)
const useAuth = () => {
  return {
    isAuthenticated: true,
    role: "member", // "guest" | "user" | "member" | "manager"
    name: "John Doe",
  };
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, role } = useAuth();

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-700 rounded-sm" />
          <span className="text-lg font-semibold text-gray-900">Prayer App</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex space-x-6 text-sm text-gray-700">
          {
            HeaderType.map((type, index) => <Link href={type.href} key={index} className="hover:text-blue-700">{type.name}</Link> )
          }
        </nav>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
            <Bell className="w-5 h-5 text-gray-700" />
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
            <Link href="/" className="text-gray-800 hover:text-blue-700">Home</Link>
            <Link href="/community" className="text-gray-800 hover:text-blue-700">Community</Link>
            <Link href="/submit" className="text-gray-800 hover:text-blue-700">Submit</Link>
            {isAuthenticated ? (
              <Link href={`/dashboard/${role}`} className="text-gray-800 hover:text-blue-700">Dashboard</Link>
            ) : (
              <Link href="/login" className="text-gray-800 hover:text-blue-700">Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

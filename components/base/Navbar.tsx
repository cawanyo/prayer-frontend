'use client'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Calendar1, Church, CircleUserRound, House, Menu, NotebookPen, X } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { NavbarType } from '@/constants'
import { usePathname } from 'next/navigation'
import { AuthContext } from '@/utils/AuthContext'



interface link_props {
    href: string,
    isActive: boolean,
    children?: React.ReactNode
}

function  NavBarLink({ href, isActive, children}: link_props){
    return (
        <Link href={href} className={cn("flex items-center gap-2 text-gray-700 w-full h-12 p-2 rounded-md ",isActive && 'bg-blue-50' )}>
            {children}
        </Link>
    )
}

export default function Navbar() {
    const auth = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
  return (
    <>
        <aside className="w-64 bg-white border-r min-h-full p-6 space-y-6  hidden  sm:flex flex-col">
            <div className="flex items-center space-x-3">
            <img
                src="/assets/icons/user.svg"
                alt="Profile avatar"
                className="w-10 h-10 rounded-full bg-[#e28743] border p-2"
            />
            <span className="font-medium text-gray-800">{auth?.user?.username}</span>
            </div>

            <nav className="space-y-2 text-sm ">
                {
                    NavbarType.map((type, index) => 
                        <NavBarLink  href={type.href} isActive={type.href == pathname} key={index} >
                            {type.icon} {type.name}
                        </NavBarLink>
                    ) 
                }
            </nav>
        </aside>

        <aside className='sm:hidden'>
            {/* Mobile nav menu with animation */}
            <div className="w-full flex justify-end p-3">
                {/* Mobile menu button */}
                <button
                    className="sm:hidden p-2 rounded-md focus:outline-none  hover:bg-gray-200"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>
            <AnimatePresence>
                {menuOpen && (
                <motion.div
                    className=" px-4 pb-4 flex flex-col space-y-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                        {
                            NavbarType.map((type, index) => 
                                <NavBarLink  href={type.href} isActive={type.href == pathname} key={index} >
                                    {type.icon} {type.name}
                                </NavBarLink>
                            ) 
                        }
                </motion.div>
                )}
            </AnimatePresence>
        </aside>
  </>
  )
}

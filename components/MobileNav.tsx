"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutDashboard, Mic, FileText, Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const mobileLinks = [
  { imgURL: Home, route: '/', label: 'Home' },
  { imgURL: LayoutDashboard, route: '/dashboard', label: 'Dashboard' },
  { imgURL: Mic, route: '/interview', label: 'Interview' },
  { imgURL: FileText, route: '/feedback', label: 'Feedback' },
  { imgURL: Gamepad2, route: '/quiz', label: 'Quiz' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <section className="sm:hidden fixed bottom-0 left-0 w-full z-50 bg-dark-200/90 backdrop-blur-lg border-t border-white/10 px-4 py-2 pb-safe">
      <div className="flex justify-between items-end max-w-md mx-auto">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== '/')
          const Icon = link.imgURL

          return (
            <Link
              href={link.route}
              key={link.label}
              className="flex flex-col items-center justify-center p-2 w-16 mb-1"
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300",
                isActive ? "bg-primary-200/15 scale-110" : "bg-transparent scale-100"
              )}>
                <Icon size={22} className={cn(
                  "transition-all duration-300", 
                  isActive ? "text-primary-200 drop-shadow-[0_0_12px_rgba(167,139,250,1)]" : "text-light-600"
                )} />
              </div>
              <span className={cn(
                "text-[10px] mt-1 transition-colors", 
                isActive ? "text-primary-200 font-bold drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]" : "font-medium text-light-600"
              )}>
                {link.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

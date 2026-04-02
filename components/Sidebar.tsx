"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutDashboard, Mic, FileText, Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { imgURL: Home, route: '/', label: 'Home' },
  { imgURL: LayoutDashboard, route: '/dashboard', label: 'Dashboard' },
  { imgURL: Mic, route: '/interview', label: 'Start Interview' },
  { imgURL: FileText, route: '/feedback', label: 'Feedbacks' },
  { imgURL: Gamepad2, route: '/quiz', label: 'Quiz' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <section className="hidden h-full w-[260px] flex-col justify-between py-10 px-6 max-md:hidden sm:flex border-r border-white/10 shrink-0 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== '/')

          const Icon = link.imgURL
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'flex gap-4 items-center p-3.5 rounded-xl justify-start font-semibold transition-all duration-200',
                {
                  'bg-primary-200 text-dark-100 shadow-[var(--shadow-glow)]': isActive,
                  'text-light-400 hover:text-white hover:bg-white/5': !isActive,
                }
              )}
            >
              <Icon size={20} className={isActive ? "text-dark-100" : "text-light-400"} />
              <p className={isActive ? "text-dark-100 font-bold" : "text-light-100"}>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

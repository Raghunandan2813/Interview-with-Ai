import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/action/auth.action'
import { redirect } from 'next/navigation'
import UserDropdown from '@/components/UserDropdown'
import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'
import MobileNav from '@/components/MobileNav'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in')
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <nav className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 bg-dark-100 z-50 shrink-0 gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex flex-row items-center gap-1 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5 shrink-0"
        >
          <Image src="/roboo.png" alt="logo" width={60} height={32} className="shrink-0 w-[40px] sm:w-[60px]" />
          <span className="text-xl font-semibold text-white tracking-tight ml-2 max-sm:hidden">InterAi</span>
        </Link>
        <div className="flex-1 flex justify-center w-full max-w-2xl">
          <SearchBar currentUserId={user.id} />
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <UserDropdown user={user} />
        </div>
      </nav>
      
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto w-full" style={{ scrollbarWidth: 'none' }}>
          <section className="flex flex-col w-full py-10 px-8 max-sm:px-4 max-sm:pb-28 mx-auto max-w-7xl">
            {children}
          </section>
        </div>
        <MobileNav />
      </div>
    </main>
  )
}

export default RootLayout
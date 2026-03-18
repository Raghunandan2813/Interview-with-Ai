import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/action/auth.action'
import { redirect } from 'next/navigation'
import UserDropdown from '@/components/UserDropdown'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in')
  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between w-full pb-2 border-b border-white/10">
        <Link
          href="/"
          className="flex flex-row items-center gap-1 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
        >
          <Image src="/roboo.png" alt="logo" width={60} height={32} className="shrink-0" />
          <span className="text-xl font-semibold text-white tracking-tight ml-2">InterAi</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-xl font-semibold  text-white tracking-tight hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <UserDropdown user={user} />
        </div>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout
import React, { ReactNode } from 'react'
import { isAuthenticated } from '@/lib/action/auth.action';
import { redirect } from 'next/navigation';
import TechSprinkle from '@/components/TechSprinkle';

const AuthLayout = async ({children} : {children : ReactNode}) => {

  const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated) redirect('/')
  return (
    <main className="relative min-h-screen overflow-hidden">
      <TechSprinkle />
      <div className='auth-layout relative z-10'>{children}</div>
    </main>
  )
}

export default AuthLayout;
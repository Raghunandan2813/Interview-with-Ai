
import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/action/auth.action'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser()
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-light-100">
        AI-powered interview generation
      </h2>
      <Agent userName={user?.name!} userId={user?.id} type="generate" />
    </div>
  )
}

export default page
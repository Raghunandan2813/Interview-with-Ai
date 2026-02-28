
import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/action/auth.action'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser()
  return (
    <>
    <h3>AI-powered interview generation</h3>
    <Agent userName={user?.name!} userId={user?.id} type='generate' />
    </>
  )
}

export default page
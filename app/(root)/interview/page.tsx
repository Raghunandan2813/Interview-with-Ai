//import Agent from '@/components/agent'
import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <>
    <h3>AI-powered interview generation</h3>
    <Agent userName='You' userId='user1' type='generate' />
    </>
  )
}

export default page
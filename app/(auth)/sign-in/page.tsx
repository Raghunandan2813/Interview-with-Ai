
import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <AuthForm type="sign-in" />
    </div>
  )
}

export default page
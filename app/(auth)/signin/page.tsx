import React from 'react'
import {Signin} from '@/components/auth/signin'
const page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
    <Signin/>
          </div>
    </div>
  )
}

export default page
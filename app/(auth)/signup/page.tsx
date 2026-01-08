"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Signup } from '@/components/auth/signup'
import { useRouter } from 'next/navigation'
const page = () => {
  const router=useRouter()
  return (
    <>
    <div className='absolute z-10 top-4 left-4 '>
    <Button className='cursor-pointer'
    variant={"ghost"}
    onClick={()=>router.back()}
    >{"<- "}Back</Button>
    </div>
   <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
         <div className="w-full max-w-sm">
            <Signup/>
             </div>
       </div>
       </>
  )
}

export default page
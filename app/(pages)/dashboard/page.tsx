"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { SignoutAction } from '@/actions/auth'
import { getPage } from '@/actions/dashboard'
import { Spinner } from '@/components/ui/spinner'
import Username from "@/components/dashboard/Username"
import Display from "@/components/dashboard/Display"
import Styles from "@/components/dashboard/Styles"
import Content from "@/components/dashboard/Content"

export default function page() {
  // const { data, isLoading } = getPage()
  // if (isLoading) {
  //   return (
  //     <div className='h-screen flex justify-center items-center'>
  //       <Spinner/>
  //     </div>
  //   )
  // }
  // if (!data.success) {
  //   return (
  //     <>
  //       <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
  //         <div className="w-full max-w-sm">
  //           <Username />
  //         </div>
  //       </div>
  //     </>

  //   )
  // }
  return (
    <>
   <div className="grid grid-cols-12 ">
    <div className="col-span-12 md:col-span-3">
      {/* Dashboard
         <Button variant="destructive" onClick={SignoutAction}>
        Logout
      </Button> */}
      <Content></Content>
    </div>

    <div className="col-span-12 md:col-span-6">
      <Display />
    </div>


    <div className="col-span-12 md:col-span-3 ">
    <Styles/>
    </div>

  </div>
     
    </>
  )
}


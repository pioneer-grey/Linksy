"use client"
import React from 'react'
import { useDashboard } from '@/hooks/useDashboard'
import { Spinner } from '@/components/ui/spinner'
import Username from "@/components/dashboard/Username"
import Display from "@/components/dashboard/Display"
import Styles from "@/components/dashboard/Styles"
import Content from "@/components/dashboard/Content"
import { useIconhook } from '@/hooks/useIconhook'
import { useBlockhook } from '@/hooks/useBlockhook'
import { useHeaderhook } from '@/hooks/useHeaderhook'
export default function page() {
  const {data,isLoading}=useDashboard()
  useIconhook()
  useBlockhook()
  useHeaderhook()


  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spinner/>
      </div>
    )
  }
  
  if (!data.success) {
    return (
      <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <Username />
          </div>
        </div>
      </>

    )
  }


  return (
    <>
   <div className="grid grid-cols-12 ">
    <div className="col-span-12 md:col-span-3">
      <Content></Content>
    </div>

    <div className="col-span-12 md:col-span-6">
      <Display/>
    </div>

    <div className="col-span-12 md:col-span-3 ">
    <Styles/>
    </div>

  </div>
     
    </>
  )
}


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
import { Button } from '@/components/ui/button'

export default function page() {
  const [toggle, setToggle] = React.useState<boolean>(false)
  const { data, isLoading } = useDashboard()

  useIconhook()
  useBlockhook()
  useHeaderhook()


  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  if (!data?.success) {
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
        <div className="hidden md:grid md:col-span-3">
          <Content />
        </div>

        <div className="col-span-12 md:col-span-6">
          <Display />
        </div>

        <div className="hidden md:grid md:col-span-3 ">
          <Styles />
        </div>
        
        {/* Mobile */}
        <div className="col-span-12 md:hidden grid grid-cols-2 items-center gap-2 p-4 border-b bg-card w-full">
          <Button onClick={() => setToggle(!toggle)}
            variant={!toggle ? "outline" : "ghost"} >Styles</Button>

          <Button onClick={() => setToggle(!toggle)}
            variant={toggle ? "outline" : "ghost"} >Content</Button>
        </div>

        <div className="col-span-12 md:hidden">
          {toggle ? <Content /> : <Styles />}
        </div>

      </div>

    </>
  )
}


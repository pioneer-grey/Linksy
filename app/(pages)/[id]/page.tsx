"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Header from "@/components/display/Header"
import Blocks from "@/components/display/Blocks"
import Icons from "@/components/display/Icons"
import { useBiohook } from '@/hooks/useBiohook'
import { Spinner } from '@/components/ui/spinner'
import { ScrollArea } from '@/components/ui/scroll-area'
const page = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, styles } = useBiohook(id)

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }



  return (
    <>
<div
  className="min-h-screen flex items-center justify-center bg-gray-100"
  style={{ backgroundColor: styles?.desktopBackgroundColor || "" }}
>
  <div
    className="
      relative
      w-screen h-screen         
      md:w-full md:max-w-sm      
      md:h-auto md:aspect-[10/17] 
      rounded-none md:rounded-xl 
      shadow-none md:shadow-xl    
      overflow-hidden
      bg-amber-500
    "
    style={{
      color: styles?.primaryTextColor || "",
      backgroundColor: styles?.primaryBackground || "",
    }}
  >
    <ScrollArea className="h-full w-full">
      <Header />
      <Icons />
      <Blocks />
    </ScrollArea>
  </div>
</div>
    </>
  )
}

export default page
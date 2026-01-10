import React from 'react'
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const Display = () => {
  return (
    <>
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className={
    cn("relative w-full max-w-[300px] aspect-[10/21] rounded-[2.5rem] border-2 border-black bg-white shadow-lg overflow-hidden","bg-amber-500")}>
      <header className='w-full bg-green-600 h-[30%] flex justify-center items-center flex-col gap-1 py-3'>
        <div className={cn("border-2 rounded-full border-black ")}>
          <Avatar className='w-20 h-20 rounded-full'>
          <AvatarImage 
          className='object-cover'
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        </div>
        <p className='text-sm font-medium leading-none tracking-tight pb-4'>subhan</p>
        <p
        className=' max-w-xs text-center text-[11px] leading-snug '
        >Lorem ipsum dolor sit amet consectetur  elit. Inventore laboriosam obcaecati perspiciatis</p>
      </header>
    
  </div>
</div>
    </>
  )
}

export default Display
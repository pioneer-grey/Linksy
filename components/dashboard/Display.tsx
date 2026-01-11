import React from 'react'
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useHeader } from '@/store/useHeader';

const Display = () => {
  const {header}=useHeader()

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className={
          cn("relative w-full max-w-[300px] aspect-[10/21] rounded-[2.5rem] border-2 border-black bg-white shadow-2xl overflow-hidden", "bg-amber-500")}>
          <header className='w-full bg-green-600 h-[30%] flex justify-center items-center flex-col gap-1 py-3'>
            <div className={cn("border-2 rounded-full border-black ")}>
              <Avatar className='w-20 h-20 rounded-full'>
                <AvatarImage
                  className='object-cover'
                  src={header?.picURL || ""}
                  alt={header?.userName}
                />
                <AvatarFallback>{header?.userName?.slice(0, 2).toUpperCase() ?? "LR"}</AvatarFallback>
              </Avatar>
            </div>
            <p className='text-sm font-medium leading-none tracking-tight pb-4'>{header?.name}</p>
            <p
              className=' max-w-[70%] text-center text-[11px] leading-snug '
            >{header?.bio}</p>
          </header>

        </div>
      </div>
    </>
  )
}

export default Display
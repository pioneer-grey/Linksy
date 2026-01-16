import React from 'react'
import { cn } from "@/lib/utils";
import { useStyles } from '@/store/useStyles';
import Header from '../display/Header';
import Icons from "../display/Icons"
import Blocks from "@/components/display/Blocks"
import { ScrollArea } from '../ui/scroll-area';

const Display = () => {
  const { styles } = useStyles()
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100"
        style={{ backgroundColor: styles?.desktopBackgroundColor || "" }}
      >
        <div className={
          cn("relative  w-full max-w-[300px] aspect-[10/21] rounded-[2.5rem] border-2 border-black shadow-2xl overflow-hidden bg-amber-500")}
          style={{
            color: styles?.primaryTextColor || "",
            backgroundColor: styles?.primaryBackground || ""
          }}
        >
          <ScrollArea className='overflow-auto h-full'>
          <Header />
          <Icons/>
          <Blocks/>
          </ScrollArea>
          
        </div>
      </div>
    </>
  )
}

export default Display
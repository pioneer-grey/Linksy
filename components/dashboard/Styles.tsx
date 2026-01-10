import React from 'react'
import { Input } from '../ui/input'
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
const Styles = () => {
  return (
    <div className='bg-card max-h-screen overflow-auto'>
        <div className='border-b mb-2'>
          <h1 className='text-sm font-bold pt-2 pl-4'>General Styles</h1>
          <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl '>
            <p className='text-sm font-light'>Primary Text Color</p>
            <Input className='w-15' type='color' onChange={(e)=>{console.log(e.target.value)}}></Input>
          </div>
          <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Primary Background</p>
            <Input className='w-15' type='color'></Input>
          </div>
            <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Desktop Background Color</p>
            <Input className='w-15' type='color'></Input>
          </div>
        </div>

 <div className='border-b mb-2'>
          <h1 className='text-sm pt-2 pl-4 font-bold '>Header Styles</h1>
          <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Profile Picture Shadow</p>
           <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[40%]")}
    />
          </div>
          <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
            <p className='text-sm  font-light'>Profile Picture Border</p>
            <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[40%]")}
        />
          </div>
           <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
            <p className='text-sm  font-light'>Social Icon Size</p>
            <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[40%]")}
        />
          </div>
        </div>

        <div className=' mb-2'>
          <h1 className='text-sm font-bold pt-2 pl-4'>Card Styles</h1>
          <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl '>
            <p className='text-sm font-light'>Card Color</p>
            <Input className='w-15' type='color'></Input>
          </div>
          <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Card Text Color</p>
            <Input className='w-15' type='color'></Input>
          </div>
           <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Card Corner</p>
            <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[40%]")}
        />
          </div>
<div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Card Border</p>
            <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[40%]")}
        />
          </div>
 <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Card Border Color</p>
            <Input className='w-15' type='color'></Input>
          </div>
          <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Card Shadow</p>
            <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[40%]")}
        />
          </div>
          <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
            <p className='text-sm font-light'>Card Spacing</p>
            <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[40%]")}
        />
          </div>

          </div>
          

        </div>
  )
}

export default Styles
import React from 'react'
import IconDialog from "@/components/content/Icons/IconDialog"
import DisplayIcons from './DisplayIcons'
import { useIcon } from '@/store/useIcons'
import { UpdateIcons } from '@/actions/Icons'


const IconsForm = () => {
  
  return (
    <>
    <div className='flex justify-between items-center border-b pb-1'>
      <h1>Add Icons</h1>
       <IconDialog/>
    </div>
    <DisplayIcons/>

   
    </>
    
  )
}

export default IconsForm
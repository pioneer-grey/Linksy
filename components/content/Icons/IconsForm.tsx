import React from 'react'
import IconDialog from "@/components/content/Icons/IconDialog"
import DisplayIcons from './DisplayIcons'
import {useIcon} from "@/store/useIcons"
const IconsForm = () => {
  const{icon}=useIcon()
  
  return (
    <>
    <div className='flex justify-between items-center border-b pb-1'>
      <h1>Add Icons</h1>
       <IconDialog/>
    </div>
    {icon &&
      <DisplayIcons/>  
    }
   
    </>
    
  )
}

export default IconsForm
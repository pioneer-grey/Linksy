import React from 'react'
import IconDialog from "@/components/content/Icons/IconDialog"
import DisplayIcons from './DisplayIcons'
import {useIcon} from "@/store/useIcons"
const IconsForm = () => {
  const{icon}=useIcon()
  if(!icon ) return null
  return (
    <>
    <div className='flex justify-between items-center border-b pb-1'>
      <h1>Add Icons</h1>
       <IconDialog/>
    </div>
    {icon.length>0&&
      <DisplayIcons/>  
    }
   
    </>
    
  )
}

export default IconsForm
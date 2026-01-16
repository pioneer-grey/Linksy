import React from 'react'
import IconDialog from "@/components/content/Icons/IconDialog"
import DisplayIcons from './DisplayIcons'

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
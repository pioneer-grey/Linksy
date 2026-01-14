import React from 'react'
import IconSelect from "@/components/dashboard/content/IconSelect"
import DisplayIcons from './DisplayIcons'
const IconsForm = () => {
  return (
    <>
    <div className='flex justify-between items-center border-b pb-1'>
      <h1>Add Icons</h1>
       <IconSelect/>
    </div>
    <DisplayIcons></DisplayIcons>
   
    </>
    
  )
}

export default IconsForm
import React from 'react'
import IconDialog from "@/components/dashboard/content/IconDialog"
import DisplayIcons from './DisplayIcons'
import { useIcon } from '@/store/useIcons'
import { UpdateIcons } from '@/actions/Icons'
const IconsForm = () => {
  const{icon,lastState}=useIcon()
  const{mutateAsync,isPending}=UpdateIcons()

  React.useEffect(()=>{
    if(!icon) return 
    if(lastState=="delete"|| lastState=="initial") return 
    const submit=async()=>{
        try{
            await mutateAsync(icon)
        }
        catch(err){
            console.log(err)
        }
    }

    let timeout: NodeJS.Timeout
    timeout=setTimeout(()=>{
        submit()
    },5000)
    return ()=>{
        clearTimeout(timeout)
    }
  },[icon])

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
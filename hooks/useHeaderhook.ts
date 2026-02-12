import { useEffect } from "react";
import { useHeader } from "@/store/useHeader";
import {UpdateHeader} from "@/actions/header"

export const useHeaderhook=()=>{
    const{header,lastState}=useHeader()
    const{mutateAsync}=UpdateHeader()

     async function onSubmit(values: {name: string; bio: string }) {
        try {
          const res = await mutateAsync(values)
        } catch (err: any) {
          console.log(err)
        }
      }

    useEffect(() => {
    if(lastState=="initial") return 
      let timeout: NodeJS.Timeout  
        timeout = setTimeout(() => {
          const safeValues = {
            name: header?.name || "",
            bio: header?.bio || ""
          }
          onSubmit(safeValues)
        }, 5000)
    
      return () => {
        clearTimeout(timeout)   
      }
    }, [header])
}
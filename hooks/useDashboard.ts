import {getPage} from "@/actions/dashboard"
import { useHeader } from "@/store/useHeader"
import { useStyles } from "@/store/useStyles"
import { useEffect } from "react"

export const useDashboard=()=>{
     const { data, isLoading } = getPage()
      const {setHeader}=useHeader()
      const {setStyles}=useStyles()

    useEffect(()=>{
    if(data?.success && data?.header && data?.styles){
      setHeader(data.header)
      setStyles(data.styles)
    }
  },[data])
  return {data,isLoading}
}
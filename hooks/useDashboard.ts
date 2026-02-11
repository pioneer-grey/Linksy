import {getPage} from "@/actions/dashboard"
import { useHeader } from "@/store/useHeader"
import { useStyles } from "@/store/useStyles"
import { useIcon } from "@/store/useIcons"
import { useBlock } from "@/store/useBlocks"
import { useEffect } from "react"

export const useDashboard=()=>{
     const { data, isLoading } = getPage()
      const {setHeader}=useHeader()
      const {setStyles}=useStyles()
      const {setIcon}=useIcon()
      const {setBlock}=useBlock()

    useEffect(()=>{
    if(data?.success){
      setHeader(data.header)
      setStyles(data.styles)
      setIcon(data.icons)
      setBlock(data.blocks)
      console.log(data)
    }
  },[data])
  return {data,isLoading}
}
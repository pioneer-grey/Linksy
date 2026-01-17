import { useEffect } from "react";
import {getBio} from "@/actions/bio"
import { useStyles } from "@/store/useStyles";
import { useIcon } from "@/store/useIcons";
import { useHeader } from "@/store/useHeader";
import { useBlock } from "@/store/useBlocks";
export const useBiohook=(id:string)=>{
    const {data,isLoading}=getBio(id)
    const {setStyles,styles}=useStyles()
    const {setIcon}=useIcon()
    const {setHeader}=useHeader()
    const {setBlock}=useBlock()
    useEffect(()=>{
        if(data?.styles){
            setStyles(data.styles)
            setHeader(data.header)
            setBlock(data.block)
            setIcon(data.icon)
        }
    },[data])

    return {isLoading,styles}
}
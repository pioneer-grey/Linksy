import {useMutation, useQueryClient  } from "@tanstack/react-query"; 
import axios from "axios";
import { toast } from "sonner"

export const reorderBlock=()=>{
    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(blocks:{id:string,order:number}[])=>{
            const res=await axios.put("/api/page/block",{blocks})
            return res.data
        },

    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
          "Something went wrong. Please try again."
        )
      } else {
        toast.error("Unexpected error occurred")
      }
    },
  })
  return { mutateAsync, isPending }
}

export const deleteBlock=()=>{
    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(id:string)=>{
            const res=await axios.delete("/api/page/block",{data:{
                id
            }})
            return res.data
        },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
          "Something went wrong. Please try again."
        )
      } else {
        toast.error("Unexpected error occurred")
      }
    },
  })
  return { mutateAsync, isPending }
}


export const addButtonBlock=()=>{
    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(values:{type:string,title:string|null,url:string|null})=>{
            const res=await axios.post("/api/page/block/button",values)
            return res.data
        },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
          "Something went wrong. Please try again."
        )
      } else {
        toast.error("Unexpected error occurred")
      }
    },
  })
  return { mutateAsync, isPending }
}



export const updateButtonBlock=()=>{
    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(values:{id:string,title:string,url:string})=>{
            const res=await axios.put("/api/page/block/button",values)
            return res.data
        },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
          "Something went wrong. Please try again."
        )
      } else {
        toast.error("Unexpected error occurred")
      }
    },
  })
  return { mutateAsync, isPending }
}

export const addImgBlock=()=>{

    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(values:FormData)=>{
            const res=await axios.post("/api/page/block/img",values)
            return res.data
        },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
          "Something went wrong. Please try again."
        )
      } else {
        toast.error("Unexpected error occurred")
      }
    },
  })
  return { mutateAsync, isPending }
}
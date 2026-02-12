import {useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export function UploadAvatar(){

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (file: File) => {
      
      if (!file) return;

       const formData = new FormData();
       formData.append('avatar', file);
      const res = await axios.put("/api/page/profile",formData)
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
  return {mutateAsync,isPending}
}


export function UpdateHeader(){

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (values:{name:string,bio:string}) => {
      const res = await axios.put("/api/page/header",values)
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
  return {mutateAsync,isPending}
}


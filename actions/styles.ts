import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import {GeneralType,HeaderType,CardType } from "@/store/types";



export function UpdateGeneralStyles(){
  const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (values:GeneralType) => {
      const res = await axios.put("/api/page/styles/general",values)
      return res.data
    },
    // onSuccess:()=>{
    //      queryClient.invalidateQueries({ queryKey: ['getPage'] });
    // },
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

export function UpdateHeaderStyles(){
  const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (values:HeaderType) => {
      const res = await axios.put("/api/page/styles/header",values)
      return res.data
    },
    // onSuccess:()=>{
    //      queryClient.invalidateQueries({ queryKey: ['getPage'] });
    // },
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

export function UpdateCardStyles(){
  const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (values:CardType) => {
      const res = await axios.put("/api/page/styles/card",values)
      return res.data
    },
    // onSuccess:()=>{
    //      queryClient.invalidateQueries({ queryKey: ['getPage'] });
    // },
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
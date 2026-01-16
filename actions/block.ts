import { block } from "@/store/types";
import { useQuery,useMutation, useQueryClient  } from "@tanstack/react-query"; 
import axios from "axios";
import { toast } from "sonner"

export const getBlocks=()=>{
    const{data,isLoading}=useQuery({
        queryKey:["getBlocks"],
        queryFn:async()=>{
            const res=await axios.get("/api/page/block")
            return res.data
        }
    })
    return {data,isLoading}
}

export const addBlock=()=>{
    const queryClient = useQueryClient();
    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(values:{type:string,title:string|null,url:string|null})=>{
            const res=await axios.post("/api/page/block",values)
            return res.data
        },

   onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBlocks'] });
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

export const updateBlock=()=>{
    const queryClient = useQueryClient();
    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(values:block[])=>{
            const res=await axios.put("/api/page/block",values)
            return res.data
        },

   onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBlocks'] });
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

export const reorderBlock=()=>{
    const{mutateAsync,isPending}=useMutation({
        mutationFn:async(blocks:{id:string,order:number}[])=>{
            const res=await axios.put("/api/page/block/order",{blocks})
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
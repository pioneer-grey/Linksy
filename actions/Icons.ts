import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { toast } from "sonner"
import { icon } from "@/store/types";

export const getIcons=()=>{
   const {data,isLoading,isError} = useQuery({
        queryKey:["getIcons"],
        queryFn:async()=>{
            const res=await axios.get("/api/page/icons",)
            return res.data
        }
    })
    return {data,isLoading,isError}
}

export const AddIcons=()=>{
    const queryClient = useQueryClient();
    const {mutateAsync,isPending}=useMutation({
         mutationFn: async (values: {userName:string,icons:string[]}) => {
      const res = await axios.post("/api/page/icons",values)
      return res.data
    },
    onSuccess:()=>{
         queryClient.invalidateQueries({ queryKey: ['getIcons'] });
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

export const DeleteIcon=()=>{
  const queryClient = useQueryClient();
    const {mutateAsync,isPending}=useMutation({
         mutationFn: async (id:string) => {
      const res = await axios.delete("/api/page/icons",{data:{id}})
      return res.data
    },
    onSuccess:()=>{
         queryClient.invalidateQueries({ queryKey: ['getIcons'] });
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
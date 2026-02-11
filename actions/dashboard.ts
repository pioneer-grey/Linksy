import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { toast } from "sonner"

export const getPage=()=>{
   const {data,isLoading,isError} = useQuery({
        queryKey:["getPage"],
        queryFn:async()=>{
            const res=await axios.get("/api/dashboard")
            return res.data
        },
        staleTime:Infinity
    })
    return {data,isLoading,isError}
}

export function AddUsername() {
const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (userName: string) => {
      const res = await axios.post("/api/dashboard/username", { userName })
      return res.data
    },
    onSuccess:()=>{
         queryClient.invalidateQueries({ queryKey: ['getPage'] });
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
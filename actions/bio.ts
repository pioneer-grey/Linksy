import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBio=(userName:string)=>{
      const {data,isLoading,isError} = useQuery({
        queryKey:["getBio"],
        queryFn:async()=>{
            const res=await axios.get(`/api/bio/${userName}`)
            return res.data
        }
    })
    return {data,isLoading,isError}
}
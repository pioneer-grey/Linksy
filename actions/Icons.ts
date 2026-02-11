import { useMutation} from "@tanstack/react-query";
import axios from "axios"
import { toast } from "sonner"
import { icon } from "@/store/types";

export const AddIcons = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: { icons: string[] }) => {
      const res = await axios.post("/api/page/icons", values)
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

export const DeleteIcon = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete("/api/page/icons", { data: { id } })
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

export const UpdateIcons = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (icons: icon[]) => {
      const res = await axios.put("/api/page/icons", { icons })
      return res.data
    },
    onError: (err: any) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ??
          "Something went wrong. Please try again."
        )
      }
      else {
        toast.error("Unexpected error occurred")
      }
    },
  })
  return { mutateAsync, isPending }
}
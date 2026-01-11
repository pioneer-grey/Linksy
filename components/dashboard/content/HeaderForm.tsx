import React, { useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { UpdateHeader } from '@/actions/page'
import { useHeader } from '@/store/useHeader'

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .max(50, { message: "Name must be less than 50 characters." }),

  bio: z.string().max(150, { message: "Bio must be less than 150 characters." })
});


const HeaderForm = () => {

  const { mutateAsync } = UpdateHeader()
  const { header, setBio, setName } = useHeader()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: header?.name || "",
      bio: header?.bio || ""
    },
  })

  async function onSubmit(values: { name: string; bio: string }) {
    try {
      const res = await mutateAsync(values)
      console.log(res)
    } catch (err: any) {
      console.log(err)
    }
  }
useEffect(() => {
  let timeout: NodeJS.Timeout

  const subscription = form.watch((values) => {
    clearTimeout(timeout)  
    timeout = setTimeout(() => {
      const safeValues = {
        name: values.name || "",
        bio: values.bio || ""
      }
      onSubmit(safeValues)
    }, 5000)
  })

  return () => {
    clearTimeout(timeout)   
    subscription.unsubscribe()
  }
}, [form])

  return (
    <Form {...form} >
      <form className="space-y-4 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" type="text" {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setName(e.target.value)
                  }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Bio"  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setBio(e.target.value)
                  }} />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default HeaderForm
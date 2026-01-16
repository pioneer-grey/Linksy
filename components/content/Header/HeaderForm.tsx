import React from 'react'
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
import { useHeader } from '@/store/useHeader'

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .max(50, { message: "Name must be less than 50 characters." }),

  bio: z.string().max(150, { message: "Bio must be less than 150 characters." })
});


const HeaderForm = () => {

  const { header, setBio, setName } = useHeader()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: header?.name || "",
      bio: header?.bio || ""
    },
  })

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
                <Textarea placeholder="Bio"  
                minLength={15}
                {...field}
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
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
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
export const formSchema = z.object({
   name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters." }),

    bio:z.string().max(150,{message:"Bio must be less than 150 characters."})
});


const HeaderForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:"",
          bio:""
        },
      })
    
      async function onSubmit(values: z.infer<typeof formSchema>) {
    
        try {
        
        }
        catch (err: any) {
        
        }
        finally{
        }
      }
  return (
     <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" type="text" {...field} />
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
                        <Textarea placeholder="Bio"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button  className='w-full' type="submit">Save</Button>
              </form>
            </Form>
  )
}

export default HeaderForm
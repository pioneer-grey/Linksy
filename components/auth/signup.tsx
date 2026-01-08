"use client"
import React from 'react'
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils"
import { FieldDescription } from '../ui/field'

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password must be less than 64 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const Signup = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name:"",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }
  return (
  <>
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create new account</CardTitle>
          <CardDescription>
            Enter your details to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
           <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@xyz.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button className='w-full' type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/signin">Sign in</a>
                </FieldDescription>
          </form>
           </Form>
        </CardContent>
      </Card>
    </div>
  </>
  )
}


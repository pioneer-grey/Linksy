import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Info } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { toast } from "sonner"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AddUsername } from '@/actions/page';

export const formSchema = z.object({
    Username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(30, { message: "Username must be less than 30 characters." })
        .regex(/^[a-zA-Z0-9_.]+$/, {
            message: "Username can only contain letters, numbers, underscores, and dots.",
        }),
});

const Username = ({ className,
    ...props
}: React.ComponentProps<"div">) => {
    const {mutateAsync,isPending}=AddUsername()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Username: ""
        },
    })
   

    async function onSubmit(values: z.infer<typeof formSchema>) {
       try{
            await mutateAsync(values.Username)
       }
       catch(err:any){
        console.log(err)
       }
            
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Claim your username</CardTitle>
                    <CardDescription>
                        Secure your unique profile URL.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                            <FormField
                                control={form.control}
                                name="Username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>

                                        <FormControl>
                                            <InputGroup>
                                                <InputGroupAddon>
                                                    <InputGroupText>
                                                        {process.env.NEXT_PUBLIC_PROJECT_URL}
                                                    </InputGroupText>
                                                </InputGroupAddon>

                                                <InputGroupInput
                                                    {...field}

                                                    className="pl-1"
                                                />

                                                <InputGroupAddon align="inline-end">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <InputGroupButton className="rounded-full" size="icon-xs">
                                                                <Info />
                                                            </InputGroupButton>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            This will be your public profile URL
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isPending} className='w-full' type="submit">Get Started</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Username
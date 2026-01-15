import React from 'react'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {HeaderType } from '@/store/types'
import { UpdateHeaderStyles } from '@/actions/styles'
import { useStyles } from '@/store/useStyles'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

export const formSchema = z.object({
    profilePictureShadow: z.number(),
    profilePictureBorder: z.number(),
    socialIconSize: z.number(),
});

const HeaderStyles = () => {

    const { setProfilePictureBorder, setProfilePictureShadow,
        setSocialIconSize,styles } = useStyles()

    const {mutateAsync}=UpdateHeaderStyles()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            profilePictureShadow: styles?.profilePictureShadow ?? 2,
            profilePictureBorder: styles?.profilePictureBorder ?? 2,
            socialIconSize: styles?.socialIconSize ?? 20,
        },
    })

    async function onSubmit(values: HeaderType) {
        try {
          const res = await mutateAsync(values)
          console.log(res)
        } catch (err: any) {
          console.log(err)
        }
    }

       React.useEffect(() => {
            let timeout: NodeJS.Timeout
    
            const subscription = form.watch((values) => {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
    
                    const safeValues = {
                        userName: styles?.userName || "",
                        profilePictureShadow: values.profilePictureShadow ?? 2,
                        profilePictureBorder: values.profilePictureBorder ?? 2,
                        socialIconSize: values.socialIconSize ?? 2,
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
        <>
            <Form {...form}>
                <form className='border-b m-2'  >
                    <h1 className='text-sm pt-2 pl-4 font-bold '>Header Styles</h1>
                    <FormField
                        control={form.control}
                        name="profilePictureShadow"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Profile Picture Shadow</p>
                                        <Slider
                                            min={0}
                                            max={10}
                                            step={1}
                                            className="w-[40%]"
                                            value={[field.value]}
                                            onValueChange={(val) => {
                                                field.onChange(val[0])
                                                setProfilePictureShadow(val[0])
                                            }}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="profilePictureBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm  font-light'>Profile Picture Border</p>
                                        <Slider
                                            min={0}
                                            max={10}
                                            step={1}
                                            className={cn("w-[40%]")}
                                            value={[field.value]}
                                            onValueChange={(val: number[]) =>{ 
                                                field.onChange(val[0])
                                                setProfilePictureBorder(val[0])}}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="socialIconSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm  font-light'>Social Icon Size</p>
                                        <Slider
                                            min={18}
                                            max={28}
                                            value={[field.value]}
                                            step={1}
                                            className={cn("w-[40%]")}
                                            onValueChange={(val: number[]) =>{ 
                                                field.onChange(val[0])
                                                setSocialIconSize(val[0])}}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    )
}

export default HeaderStyles
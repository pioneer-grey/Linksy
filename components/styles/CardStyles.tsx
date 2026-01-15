import React from 'react'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { styles } from '@/store/types'
import { useStyles } from '@/store/useStyles'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export const formSchema = z.object({
    cardColor: z.string(),
    cardTextColor: z.string(),
    cardCorner: z.number(),
    cardBorder: z.number(),
    cardBorderColor: z.string(),
    cardShadow: z.number(),
    cardSpacing: z.number(),
});

const CardStyles = () => {
    const { styles } = useStyles()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardColor: styles?.cardColor || "",
            cardTextColor: styles?.cardTextColor || "",
            cardCorner: styles?.cardCorner ?? 2,
            cardBorder: styles?.cardBorder ?? 2,
            cardBorderColor: styles?.cardBorderColor || "",
            cardShadow: styles?.cardShadow ?? 2,
            cardSpacing: styles?.cardSpacing ?? 2
        },
    })
    async function onSubmit(values: styles) {
        // try {
        //   const res = await mutateAsync(values)
        //   console.log(res)
        // } catch (err: any) {
        //   console.log(err)
        // }
    }

    return (
        <>
            <Form {...form}>
                <form className='m-2' >
                    <h1 className='text-sm font-bold pt-2 pl-4'>Card Styles</h1>
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl '>
                                        <p className='text-sm font-light'>Card Color</p>
                                        <Input className='w-15' type='color'></Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Text Color</p>
                                        <Input className='w-15' type='color'></Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>

                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Corner</p>
                                        <Slider
                                            defaultValue={[50]}
                                            max={100}
                                            step={1}
                                            className={cn("w-[40%]")}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Border</p>
                                        <Slider
                                            defaultValue={[50]}
                                            max={100}
                                            step={1}
                                            className={cn("w-[40%]")}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Border Color</p>
                                        <Input className='w-15' type='color'></Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Shadow</p>
                                        <Slider
                                            defaultValue={[50]}
                                            max={100}
                                            step={1}
                                            className={cn("w-[40%]")}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardBorder"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-4 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Card Spacing</p>
                                        <Slider
                                            defaultValue={[50]}
                                            max={100}
                                            step={1}
                                            className={cn("w-[40%]")}
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

export default CardStyles
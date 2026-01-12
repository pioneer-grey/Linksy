import React from 'react'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UpdateGeneralStyles } from '@/actions/styles'
import { useStyles } from '@/store/useStyles'
import { GeneralType } from '@/store/types'



export const formSchema = z.object({
    primaryTextColor: z.string(),
    primaryBackground: z.string(),
    desktopBackgroundColor: z.string(),
});


const GeneralStyles = () => {
    const { setDesktopBackgroundColor, setPrimaryBackground,
        setPrimaryTextColor, styles } = useStyles()

    const { mutateAsync } = UpdateGeneralStyles()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            primaryTextColor: styles?.primaryTextColor || "",
            primaryBackground: styles?.primaryBackground || "",
            desktopBackgroundColor: styles?.desktopBackgroundColor || "",
        },
    })


    async function onSubmit(values: GeneralType) {
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
                    primaryTextColor: values.primaryTextColor || "",
                    primaryBackground: values.primaryBackground || "",
                    desktopBackgroundColor: values.desktopBackgroundColor || "",
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
                <form className='border-b mb-2 mt-2' >
                    <h1 className='text-sm font-bold pt-2 pl-4'>General Styles</h1>
                    <FormField
                        control={form.control}
                        name="primaryTextColor"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl '>
                                        <p className='text-sm font-light'>Primary Text Color</p>
                                        <Input className='w-15' type='color' {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setPrimaryTextColor(e.target.value)
                                            }}>
                                        </Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="primaryBackground"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Primary Background</p>
                                        <Input className='w-15' type='color'
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setPrimaryBackground(e.target.value)
                                            }}></Input>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desktopBackgroundColor"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-between border-2 p-2 m-2 rounded-2xl'>
                                        <p className='text-sm font-light'>Desktop Background Color</p>
                                        <Input className='w-15' type='color'
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                setDesktopBackgroundColor(e.target.value)
                                            }}></Input>
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

export default GeneralStyles
import React from 'react'
import { useIcon } from '@/store/useIcons'
import { GripVertical, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { DeleteIcon } from '@/actions/Icons';
import { toast } from 'sonner';

const DisplayIcons = () => {
    const { mutateAsync } = DeleteIcon()

    const { icon } = useIcon()
    const deleteIcon = async(id: string) => {
        try {
            const res= mutateAsync(id)
            toast.promise(res,{
                success:"Icon Deleted",
                loading:"Deleting Icon...",
                error:"Failed to delete icon"
            })
            await res
        }
        catch (err: any) {
            console.log(err)
        }
    }
        return (
            <>
                <div className='pt-2'>
                    <h1>Icons</h1>
                    {icon?.map((item, i) => (
                        <div key={item.id}>
                            <div className='mt-2 flex items-center gap-1'>
                                <span>
                                    <GripVertical
                                        className='cursor-pointer'
                                        size={18}
                                    />
                                </span>
                                <Input type="text"
                                    placeholder='https://www.example.com'
                                    defaultValue={item?.url || ""}
                                />
                                <span>
                                    <Trash2
                                        className='hover:text-red-500'
                                        size={18} 
                                        onClick={()=>deleteIcon(item?.id)}
                                        />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    export default DisplayIcons
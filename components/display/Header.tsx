import React from 'react'
import { cn } from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useHeader } from '@/store/useHeader';
import { useStyles } from '@/store/useStyles';

const shadowMap = [
    "0 0 0 rgba(0,0,0,0)",
    "0 1px 2px rgba(0,0,0,0.05)",
    "0 2px 4px rgba(0,0,0,0.08)",
    "0 3px 6px rgba(0,0,0,0.1)",
    "0 4px 8px rgba(0,0,0,0.12)",
    "0 5px 10px rgba(0,0,0,0.15)",
    "0 6px 12px rgba(0,0,0,0.18)",
    "0 7px 14px rgba(0,0,0,0.2)",
    "0 8px 16px rgba(0,0,0,0.22)",
    "0 9px 18px rgba(0,0,0,0.25)",
    "0 10px 20px rgba(0,0,0,0.3)",
]

const Header = () => {
    const { header } = useHeader()
    const { styles } = useStyles()
    return (
        <>
            <header className='w-full flex justify-center mt-4 items-center flex-col gap-2 py-3'>
                <div className={cn("border-2 rounded-full border-black ")}
                    style={{
                        borderWidth: styles?.profilePictureBorder ?? 2,
                        boxShadow: shadowMap[styles?.profilePictureShadow ?? 2],
                    }}
                >
                    <Avatar className='w-20 h-20 rounded-full'>
                        <AvatarImage
                            className='object-cover'
                            src={header?.picURL || "https://github.com/maxleiter.png"}
                            alt={header?.userName}
                        />
                        <AvatarFallback>{header?.userName?.slice(0, 2).toUpperCase() ?? "LR"}</AvatarFallback>
                    </Avatar>
                </div>
                <p className='text-sm max-w-[70%] font-medium leading-none tracking-tight pb-2'>{header?.name}</p>
                <p
                    className=' max-w-[70%] text-center text-[11px] leading-snug '
                >{header?.bio}</p>
            </header>

        </>
    )
}

export default Header
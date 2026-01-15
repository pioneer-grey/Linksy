import React from 'react'
import {IconDetails } from '@/lib/IconsList'
import { useIcon } from '@/store/useIcons'
import { useStyles } from '@/store/useStyles'
const Icons = () => {
    const {icon}=useIcon()
    const {styles}=useStyles()
  return (
    <>
    <div className='flex flex-wrap pl-2 pr-2 gap-1 items-center h-auto justify-center w-full'>
    { icon && icon.map((item,i)=>{
        const Comp=IconDetails(item.type)?.icon
        return (
        <div key={item.id}>
            {Comp&& 
            <a href={item.url ||"https://www.example.com" } target='_blank'>
                <Comp size={styles?.socialIconSize ?? 20}
            />
            </a>}
        </div>
    )
    })
    }
    </div>
    </>
  )
}

export default Icons
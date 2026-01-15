import React from 'react'
import { useStyles } from '@/store/useStyles'
import { shadowMap } from '@/components/display/Header'

type Props={
    title:string| null,
    url:string|null,
}
const ButtonBlock = ({title,url}:Props) => {
    const{styles}=useStyles()
  return (
    <>
    <a href={url || "https://www.example.com"}
    target='_blank'
    className='flex justify-center items-center bg-black w-[90%] h-10'
    style={{
    borderStyle: "solid",
    borderWidth: styles?.profilePictureBorder ?? 2,
    boxShadow: shadowMap[styles?.profilePictureShadow ?? 2],
    borderColor: styles?.cardBorderColor ||"#e5e7eb",
    borderRadius: styles?.cardCorner ??5,
  }}
    >
    <h1>{title || ""}</h1>
    </a>
   
    </>
  )
}

export default ButtonBlock
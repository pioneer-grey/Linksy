import React from 'react'
import { useStyles } from '@/store/useStyles'
import { shadowMap } from '@/components/display/Header'

type Props = {
  title: string,
  url: string,
  imgURL:string,
}

const ImgBlock = ({title,url,imgURL}:Props) => {
     const { styles } = useStyles()
  return (
   <>
   <a
         href={url}
         target={"_blank"}
         rel={"noopener noreferrer"}
         className="flex justify-center items-center w-[90%] h-10"
         style={{
           borderStyle: "solid",
           borderWidth: styles?.cardBorder ?? 0,
           boxShadow: shadowMap[styles?.cardShadow ?? 2],
           borderColor: styles?.cardBorderColor || "white",
           borderRadius: styles?.cardCorner ?? 5,
           backgroundColor: styles?.cardColor || "navy"
         }}
       >
        <img src={imgURL} alt={title} />
         <h1>{title}</h1>
       </a>
   </>
  )
}

export default ImgBlock
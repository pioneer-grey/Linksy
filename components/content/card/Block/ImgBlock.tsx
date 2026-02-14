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
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center w-[90%]  "
  style={{
    borderStyle: "solid",
    borderWidth: (styles?.cardBorder ?? 1) + "px",
    borderColor: styles?.cardBorderColor || "white",
   borderTopLeftRadius: (styles?.cardCorner ?? 5) + "px",
   borderTopRightRadius: (styles?.cardCorner ?? 5) + "px",
   borderBottomLeftRadius: (styles?.cardCorner ?? 5) + "px",
      borderBottomRightRadius: (styles?.cardCorner ?? 5) + "px",
    boxShadow: shadowMap[styles?.cardShadow ?? 2],
  }}
>
  <img 
  className='h-35 w-full object-cover'
  src={imgURL} alt={title} 
  style={{
    borderTopLeftRadius: (styles?.cardCorner ?? 5) + "px",
   borderTopRightRadius: (styles?.cardCorner ?? 5) + "px",
  }}
  />
  <div
    className="h-10 w-full flex justify-center items-center"
    style={{
      backgroundColor: styles?.cardColor || "navy",
      borderBottomLeftRadius: (styles?.cardCorner ?? 5) + "px",
      borderBottomRightRadius: (styles?.cardCorner ?? 5) + "px",
    }}
  >
    <h1>{title}</h1>
  </div>
</a>
   </>
  )
}

export default ImgBlock
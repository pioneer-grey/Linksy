import React, { useRef, useState } from 'react'
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import { Button } from '@/components/ui/button'
import 'react-image-crop/dist/ReactCrop.css'
import { CircleUserRoundIcon, Upload ,Image} from "lucide-react";

type Props = {
  src: string
  onCropped: (file: File) => void
}

const CropImg = ({ src, onCropped }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null)

  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: Math.min(width, height) * 0.8, 
        },
        1,
        width,
        height
      ),
      width,
      height
    )

    setCrop(crop)
    imgRef.current = e.currentTarget
  }

  const createCroppedFile = () => {
    if (!completedCrop || !imgRef.current) return

    const image = imgRef.current
    const canvas = document.createElement('canvas')

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const size = completedCrop.width!

    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext('2d')!

  
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.clip()

    ctx.drawImage(
      image,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      size,
      size
    )

    canvas.toBlob((blob) => {
      if (!blob) return

      const file = new File([blob], 'avatar.png', {
        type: 'image/png',
      })

      onCropped(file)
    })
  }

  return (
    <div className=" space-y-2 ">
      <ReactCrop
        crop={crop}
        onChange={(_, percent) => setCrop(percent)}
        onComplete={setCompletedCrop}
       aspect={1}
        circularCrop
        locked
      >
        <img
          ref={imgRef}
          src={src}
          onLoad={onImageLoad}
          className="h-64  w-full object-cover"
        />
      </ReactCrop>
    <div className='flex justify-center items-center'>
     <Button
      className='w-52'
        onClick={createCroppedFile}
      ><Upload/>
        Upload 
      </Button>
    </div>
     
    </div>
  )
}

export default CropImg

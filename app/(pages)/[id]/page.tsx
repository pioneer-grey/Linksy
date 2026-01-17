"use client"
import React from 'react'
import { useParams } from 'next/navigation'
const page = () => {
  const{id}=useParams<{id:string}>()
  return (
    <>
    <h1 className='text-center p-2'>{id}</h1>
    </>
  )
}

export default page
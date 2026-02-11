import React from 'react'
import CardDialog from './CardDialog'
import DisplayBlock from './DisplayBlock'
import { useBlock } from '@/store/useBlocks'
const CardForm = () => {
  const {block}=useBlock()
  return (
    <>
     <div className='flex justify-between items-center border-b pb-1'>
      <h1>New Block</h1>
       <CardDialog/>
    </div>
    {block &&
    <DisplayBlock/>
    }
    
    </>
   
  )
}

export default CardForm
import React from 'react'
import CardDialog from './CardDialog'

const CardForm = () => {
  return (
    <>
     <div className='flex justify-between items-center border-b pb-1'>
      <h1>New Block</h1>
       <CardDialog/>
    </div>
    </>
   
  )
}

export default CardForm
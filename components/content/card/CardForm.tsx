import React from 'react'
import CardDialog from './CardDialog'
import DisplayBlock from './DisplayBlock'
const CardForm = () => {
  return (
    <>
     <div className='flex justify-between items-center border-b pb-1'>
      <h1>New Block</h1>
       <CardDialog/>
    </div>
    <DisplayBlock/>
    </>
   
  )
}

export default CardForm
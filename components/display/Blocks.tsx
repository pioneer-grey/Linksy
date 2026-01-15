import React from 'react'
import { useBlock } from '@/store/useBlocks'
import { useStyles } from '@/store/useStyles'
import ButtonBlock from '../content/card/Block/ButtonBlock'
const Blocks = () => {
    const{block}=useBlock()
    const{styles}=useStyles()
  return (
    <>
    {block&&
        <div className='flex flex-col items-center mt-4'
        style={{
            gap: styles?.cardSpacing ?? 6
        }}
        >
            {block.map((item,i)=>{
                switch(item.type){
                    case "url":
                        return (
                           <ButtonBlock
                           title={item.title}
                           url={item.url}
                           />
                        )
                }
            })}
        </div>
    }
    </>
  )
}

export default Blocks
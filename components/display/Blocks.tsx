import React from 'react'
import { useBlock } from '@/store/useBlocks'
import { useStyles } from '@/store/useStyles'
import ButtonBlock from '../content/card/Block/ButtonBlock'
const Blocks = () => {
    const { block } = useBlock()
    const { styles } = useStyles()
    if (!block) return null
    return (
        <>
            {block &&
                <div className='flex flex-col items-center mt-4 pb-5'
                    style={{
                        gap: styles?.cardSpacing ?? 6,
                        color: styles?.cardTextColor || "white"
                    }}
                >
                    {block.map((item, i) => {
                        switch (item.type) {
                            case "url":
                                return (
                                    <ButtonBlock
                                        type='url'
                                        key={i}
                                        title={item.title}
                                        url={item.url}
                                    />
                                )
                            case "email":
                                return (
                                    <ButtonBlock
                                    type="email"
                                    key={i}
                                    title={item.title}
                                    url={item.url}
                                    />
                                )
                            case "img":
                                return(
                                   <>
                                   </>
                                )

                            default:
                                return null
                            }
                    })}
                </div>
            }
        </>
    )
}

export default Blocks
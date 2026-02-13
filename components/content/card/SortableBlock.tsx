import React from 'react'
import { GripVertical, Trash2, Pencil } from "lucide-react"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { block } from '@/store/types'
import { CSS } from "@dnd-kit/utilities"
import ButtonBlockForm from "@/components/content/card/BlockForm/ButtonBlockForm"

type Props = {
  item: block,
  deleteFunc: (id: string) => Promise<void>
}

const SortableBlock = ({ item, deleteFunc }: Props) => {  
  
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }


  return (
    <div ref={setNodeRef} style={style}>
      <div className="mt-2 flex items-center gap-1">

        <div className='flex items-center w-full justify-between border-2 p-4 rounded-2xl '>
          <div className='flex gap-1 items-center'>
            <span {...attributes} {...listeners} className="cursor-move">
              <GripVertical size={18} />
            </span>
            <p className=''>{item.title}</p>
          </div>
          <span>
            <div className='flex gap-1 items-center'>
              {(() => {
                switch (item.type) {
                  case "url":
                    return (
                      <>
                        <ButtonBlockForm type="url"
                          trigger={
                            <Pencil className="hover:text-blue-500" size={16} />
                          }
                          id={item.id}
                          defaultValue={{title:item.title|| "",url:item.url || ""}}
                        />
                      </>
                    )
                  case "email":
                    return (
                      <>
                       <ButtonBlockForm type="email"
                          trigger={
                            <Pencil className="hover:text-blue-500" size={16} />
                          }
                          id={item.id}
                          defaultValue={{title:item.title|| "",url:item.url || ""}}
                        />
                      </>
                    )
                  default:
                    return null
                }
              })()}
              <Trash2
                className="hover:text-red-500"
                size={18}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteFunc(item.id)
                }}
              />
            </div>

          </span>
        </div>
      </div>
    </div>
  )
}

export default SortableBlock
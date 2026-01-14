import React from 'react'
import { GripVertical, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { IconDetails } from "@/lib/IconsList"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"


const SortableItem = ({ item, deleteFunc }: any) => {
const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div ref={setNodeRef} style={style}>
      <div className="mt-2 flex items-center gap-1">
        <span {...attributes} {...listeners} className="cursor-move">
          <GripVertical size={18} />
        </span>
        <Input
          type="text"
          placeholder={IconDetails(item.type)?.label ?? "Unknown"}
          defaultValue={item?.url || ""}
        />
        <span>
          <Trash2
            className="hover:text-red-500"
            size={18}
            onClick={(e) =>{
                  e.stopPropagation()  
                deleteFunc(item.id)}}
          />
        </span>
      </div>
    </div>
  )
}

export default SortableItem
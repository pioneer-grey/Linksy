"use client"

import React from "react"
import { useIcon } from "@/store/useIcons"
import { DeleteIcon } from "@/actions/Icons"
import SortableItem from "./SortableItem"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"


const DisplayIcons = () => {
  const { mutateAsync } = DeleteIcon()
  const { icon, deleteIcon, reorderIcons} = useIcon()

  const deleteFunc = async (id: string) => {
    try {
      deleteIcon(id)
      await mutateAsync(id)
    } catch (err: any) {
      console.log(err)
    }
  }

  React.useEffect(()=>{
    console.log(icon)
  },[icon])
  
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    reorderIcons(active.id as string, over.id as string)
  }

  return (
    <div className="pt-2">
      <h1>Icons</h1>
      {icon && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={icon?.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {icon.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                deleteFunc={deleteFunc}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}

export default DisplayIcons

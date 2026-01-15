import React from 'react'
import { useBlock } from '@/store/useBlocks'
import { deleteBlock } from '@/actions/block'
import SortableBlock from './SortableBlock'
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
const DisplayBlock = () => {
    const { mutateAsync } = deleteBlock()
    const { block, deleteBlock: deleteState, reorderBlocks } = useBlock()
    const deleteFunc = async (id: string) => {
        try {
            deleteState(id)
            await mutateAsync(id)
        }
        catch (err) {
            console.log(err)
        }
    }
    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        reorderBlocks(active.id as string, over.id as string)
    }
    return (
        <div className='pt-2'>
            <h1>Blocks</h1>
        {block&&
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={block?.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {block.map((item) => (
              <SortableBlock
                key={item.id}
                item={item}
                deleteFunc={deleteFunc}
              />
            ))}
          </SortableContext>
        </DndContext>
        }
        </div>
    )
}

export default DisplayBlock
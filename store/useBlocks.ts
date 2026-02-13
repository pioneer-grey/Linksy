import { create } from 'zustand'
import { block } from "./types"

type Block = {
    block: block[] | null,
    setBlock: (block: block[]) => void,
    setOneBlock: (block: block, edit?: boolean) => void,
    lastState: "delete" | "initial" | "reorder"|"newValue",
    deleteBlock: (id: string) => void,
    reorderBlocks: (activeId: string, overId: string) => void,

}

export const useBlock = create<Block>()((set) => ({
    block: null,
    lastState: "initial",
    setBlock: (block) => set({ block }),

    setOneBlock: (block, edit = false) =>
        set((state) => {
            if (edit) {
                const blocks = state.block?.map((item) =>
                    item.id === block.id
                        ? {
                            ...item,
                            title: block.title,
                            url: block.url,
                            imgURL: block.imgURL,
                        }
                        : item
                );

                return { block: blocks ,lastState:"newValue"};
            }

            return { block: [...(state.block || []), block] ,lastState:"newValue"};
        }),
    reorderBlocks: (activeId, overId) =>
        set((state) => {
            if (!state.block || activeId === overId) return state

            const oldIndex = state.block.findIndex((i) => i.id === activeId)
            const newIndex = state.block.findIndex((i) => i.id === overId)

            if (oldIndex === -1 || newIndex === -1) return state

            const updated = [...state.block]
            const [moved] = updated.splice(oldIndex, 1)
            updated.splice(newIndex, 0, moved)

            return {
                block: updated.map((item, index) => ({
                    ...item,
                    order: index,
                })),
                lastState: "reorder"
            }
        }),
    deleteBlock: (id) =>
        set((state) => ({
            block: state.block
                ? state.block.filter((item) => item.id !== id)
                : null,
            lastState: "delete"
        })),

}))
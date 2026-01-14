import { create } from 'zustand'
import {icon} from "./types"

type Icon ={
    icon:icon[]|null,
    setIcon:(icon:icon[])=>void,
    deleteIcon:(id:string)=>void,
    reorderIcons: (activeId: string, overId: string) => void
}

export const useIcon=create<Icon>()((set) => ({
    icon:null,
    setIcon: (icon) => set({icon}),
    deleteIcon: (id) =>
    set((state) => ({
      icon: state.icon
        ? state.icon.filter((item) => item.id !== id)
        : null,
    })),
    reorderIcons: (activeId, overId) =>   
    set((state) => {
      if (!state.icon || activeId === overId) return state

      const oldIndex = state.icon.findIndex((i) => i.id === activeId)
      const newIndex = state.icon.findIndex((i) => i.id === overId)

      if (oldIndex === -1 || newIndex === -1) return state

      const updated = [...state.icon]
      const [moved] = updated.splice(oldIndex, 1)
      updated.splice(newIndex, 0, moved)

      return {
        icon: updated.map((item, index) => ({
          ...item,
          order: index,
        })),
      }
    }),
}))
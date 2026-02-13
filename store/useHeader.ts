import { create } from 'zustand'
import { header } from "@/store/types"

type Header = {
    header: header | null,
    lastState:"initial"|"newValue"|"url",
    setName: (name: string) => void,
    setPicUrl: (url: string) => void,
    setBio: (bio: string) => void,
    setHeader: (header: header) => void
}

export const useHeader = create<Header>()((set) => ({
    header: null,
    lastState:"initial",
    setHeader: (header) => set({ header }),
    
    setPicUrl:(url)=> set((state)=>{
        if(!state.header) return state
        return {
            header:{
                ...state.header,
                picURL:url
            },
            lastState:"url"
        }
    }),

    setName: (name) =>
        set((state) => {
            if (!state.header) return state

            return {
                header: {
                    ...state.header,
                    name,
                },
                lastState:"newValue"
            }
        }),

    setBio: (bio) =>
        set((state) => {
            if (!state.header) return state

            return {
                header: {
                    ...state.header,
                    bio,
                },
                lastState:"newValue"
            }
        }),
}))
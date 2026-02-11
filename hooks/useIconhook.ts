import { UpdateIcons } from "@/actions/Icons"
import { useIcon } from "@/store/useIcons"
import { useEffect } from "react"


export const useIconhook = () => {
    const { mutateAsync } = UpdateIcons()
    const { icon, lastState } = useIcon()
    
    // On Update State Run useEffect 
    useEffect(() => {
        
     if (!icon || (lastState !== "reorder" && lastState !== "url")) return
        const submit = async () => {
            try {
                await mutateAsync(icon)
            }
            catch (err) {
                console.log(err)
            }
        }

        let timeout: NodeJS.Timeout
        timeout = setTimeout(() => {
            submit()
        }, 5000)
        return () => {
            clearTimeout(timeout)
        }
    }, [icon])
}
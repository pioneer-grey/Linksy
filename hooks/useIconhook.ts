import { getIcons, UpdateIcons } from "@/actions/Icons"
import { useIcon } from "@/store/useIcons"
import { useEffect } from "react"


export const useIconhook = () => {
    const { data } = getIcons()
    const { mutateAsync } = UpdateIcons()
    const { setIcon, icon, lastState } = useIcon()
    useEffect(() => {
        if (data?.icons) {
            setIcon(data?.icons)
        }
    }, [data])

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
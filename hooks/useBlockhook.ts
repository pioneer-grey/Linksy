import { useEffect } from "react";
import {reorderBlock } from "@/actions/block"
import { useBlock } from "@/store/useBlocks";

export const useBlockhook = () => {
    const { mutateAsync } = reorderBlock()
    const { block, lastState} = useBlock()

    useEffect(() => {
       if (!block || lastState !== "reorder") return
        const submit = async () => {
            try {
                const value: { id: string; order: number }[] = []

                block.forEach((item) => {
                    value.push({
                        id: item.id,
                        order: item.order,
                    })
                })
                await mutateAsync(value)
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
    }, [block])

}
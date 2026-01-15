// import { deleteBlock, addBlock, updateBlock } from "@/actions/block"
// import { useBlock } from "@/store/useBlocks"
// import { block } from "@/store/types"
// import { toast } from "sonner"


// const { mutateAsync: deleteMutate } = deleteBlock()
// const { deleteBlock: deleteState } = useBlock()


// const { mutateAsync: updateMutate } = updateBlock()


// export const deleteBlockFunc = async (id: string) => {
//     try {
//         deleteState(id)
//         await deleteMutate(id)
//     }
//     catch (err: any) {
//         console.log(err)
//     }
// }



// export const updateBlockFunc = async (values: block[]) => {
//     try {
//         const res = updateMutate(values)
//         toast.promise(res, {
//             loading: "Updating block…",
//             success: "Block updated successfully.",
//             error: "Failed to update block."
//         })
//         await res
//     }
//     catch (err: any) {
//         console.log(err)
//     }
// }

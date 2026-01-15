import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import ButtonBlock from './Block/ButtonBlock'
import { addBlock } from "@/actions/block"
import { toast } from "sonner"

const CardDialog = () => {
  const { mutateAsync: addMutate } = addBlock()
  
  const createBlockFunc = async (values: { type: string, title: string, url: string }):Promise<void> => {
    try {
      const res = addMutate(values)
      toast.promise(res, {
        loading: "Creating block…",
        success: "Block created successfully.",
        error: "Failed to create block."
      })
      await res
    }
    catch (err: any) {
      console.log(err)
    }
  }
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="ghost"><Plus /></Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card">
            <DialogHeader>
              <DialogTitle>New Block</DialogTitle>
              <DialogDescription>
                Choose the block you’d like to add to your profile.
              </DialogDescription>
            </DialogHeader>
            {/* All Card Block Dialog Content */}
            <div className='flex flex-wrap justify-center items-center gap-2 '>
              <ButtonBlock
                trigger="URL Button"
                dialogTitle="URL Button"
                inputTitle="URL"
                inputPlaceholder="https://www.example.com"
                type="url"
                onSubmit={createBlockFunc}
              />



            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default CardDialog
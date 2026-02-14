import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { addButtonBlock, updateButtonBlock } from "@/actions/block"
import { useBlock } from "@/store/useBlocks"

type props = {
  id?: string,
  type: "url" | "email",
  defaultValue?: {
    title: string,
    url: string,
  },
  trigger: React.ReactNode,
}
const info = {
  url: {
    dialogTitle: "URL Button",
    inputTitle: "URL",
    inputPlaceholder: "https://www.example.com",
    inputType: "text"
  },
  email: {
    dialogTitle: "Email Button",
    inputTitle: "Email",
    inputPlaceholder: "example@xyz.com",
    inputType: "email"
  }
}
const ButtonBlockForm = ({ type, trigger, defaultValue, id }: props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  const { mutateAsync } = addButtonBlock()
  const { mutateAsync: updateAsync } = updateButtonBlock()

  const { setOneBlock } = useBlock()

  const createBlockFunc = async (values: { type: string, title: string, url: string }): Promise<void> => {
    try {
      const res = mutateAsync(values)
      toast.promise(res, {
        loading: "Creating block…",
        success: "Block created successfully.",
      })
      const result = await res
      setOneBlock(result.block)
    }
    catch (err: any) {
      console.log(err)
    }
  }

  const editBlockFunc = async (values: { id: string, title: string, url: string }): Promise<void> => {
    try {
      const res = updateAsync(values)
      toast.promise(res, {
        loading: "Editing block…",
        success: "Block edited successfully.",
        error: "Failed to edit block."
      })
      const result = await res
      setOneBlock(result.block, true)
    }
    catch (err: any) {
      console.log(err)
    }
  }

  const resetForm = () => {
    setTitle("");
    setUrl("");
  };

  const submit = async () => {
    try {
      setLoading(true)
      id ? await editBlockFunc({ id, title, url })
        : await createBlockFunc({ type, title, url })

      setOpen(false)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    if (defaultValue) {
      setTitle(defaultValue.title)
      setUrl(defaultValue.url)
    }
  }, [])

  return (
    <>
      <Sheet open={open} onOpenChange={(v) => {
        setOpen(!open)
        if (!id) {
          resetForm();
        }
      }}>
        <form>
          <SheetTrigger asChild>
            {trigger}
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-card p-4">
            <SheetHeader className="p-0">
              <SheetTitle>{id ? "Edit " + info[type].dialogTitle : info[type].dialogTitle}</SheetTitle>
              <SheetDescription>
                Add your information below, then click Save to apply changes.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 mt-3">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input name="title" placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="input">{info[type].inputTitle}</Label>
                <Input name="input"
                  type={info[type].inputType}
                  value={url}
                  placeholder={info[type].inputPlaceholder}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <SheetFooter className="p-0">
              <Button type="submit"
                disabled={loading} onClick={submit}>Save</Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>

            </SheetFooter>
          </SheetContent>
        </form>
      </Sheet>
    </>
  )
}

export default ButtonBlockForm
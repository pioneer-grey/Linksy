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
import { useFileUpload } from "@/hooks/use-file-upload"

type Props = {
  id?: string,
  trigger: React.ReactNode,
  defaultValue?: {
    title: string,
    url: string
  },
  onSubmit?: (values: { title: string, url: string }) => Promise<void>,
  onUpdate?: (values: { id: string, title: string, url: string }) => Promise<void>,
}
const ImgBlockForm = ({ id, defaultValue, onSubmit, onUpdate, trigger }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [url, setUrl] = useState<string>("")


  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;
  const file = files[0]?.file || null;

  const submit = async () => {
    try {
      setLoading(true)
      await onSubmit?.({ title, url })

      if (id) {
        await onUpdate?.({ id, title, url })
      }
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
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <form>
          <SheetTrigger asChild>
            {trigger}
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-card p-4">
            <SheetHeader className="p-0">
              <SheetTitle>{id ? "Edit Image Button" : "Image Button"}</SheetTitle>
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
                <Label htmlFor="input">URL</Label>
                <Input name="input"
                  type="text"
                  value={url}
                  placeholder={"https://www.example.com"}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <Label>Add Image</Label>
                <div className="relative inline-block">
                  <Button
                    type="button"
                    aria-haspopup="dialog" onClick={openFileDialog}
                    variant={fileName ? "outline" : "default"}
                  >
                    {fileName ? "Change image" : "Select image"}
                  </Button>
                  <Input
                    {...getInputProps()}
                    aria-label="Upload image file"
                    className="sr-only"
                    tabIndex={-1}
                  />

                </div>
              </div>
              {fileName && (
                <div className="inline-flex gap-2 text-xs">
                  <img 
                  className="rounded-lg"
                  src={previewUrl || ""} alt="img" />
                </div>)}

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

export default ImgBlockForm
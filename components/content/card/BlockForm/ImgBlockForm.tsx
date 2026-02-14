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
import { useBlock } from "@/store/useBlocks"
import { addImgBlock } from "@/actions/block"
import { toast } from "sonner"

type Props = {
  id?: string,
  trigger: React.ReactNode,
  defaultValue?: {
    title: string,
    url: string,
    imgURL: string
  },
}
const ImgBlockForm = ({ id, defaultValue, trigger }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [imgUrl, setImgUrl] = useState<string>("")


  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null;


  const fileName = files[0]?.file.name || null;
  const file = files[0]?.file || null;
  const fileId = files[0]?.id

  const { mutateAsync } = addImgBlock()
  const { setOneBlock } = useBlock()

  const createBlockFunc = async (values: FormData): Promise<void> => {
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

  const editBlockFunc = async (values: FormData): Promise<void> => {
    // try {
    //   const res = updateAsync(values)
    //   toast.promise(res, {
    //     loading: "Editing block…",
    //     success: "Block edited successfully.",
    //     error: "Failed to edit block."
    //   })
    //   const result=await res
    //   setOneBlock(result.block,true)
    // }
    // catch (err: any) {
    //   console.log(err)
    // }
  }


  const submit = async () => {

    if (!file || !(file instanceof File)) {
      toast.error("Image is not selected");
      return;
    }

    try {
      setLoading(true)

      const form = new FormData()
      form.append("img", file)
      form.append("title", title)
      form.append("url", url)

      // id ?  await editBlockFunc():  
      await createBlockFunc(form)


      setOpen(false)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }

  }

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setImgUrl("");
    removeFile(fileId);
  };


  useEffect(() => {
    if (defaultValue) {
      setTitle(defaultValue.title)
      setUrl(defaultValue.url)
      setImgUrl(defaultValue.imgURL)
      console.log("I am Ing ", imgUrl)
    }

  }, [open])

  useEffect(() => {
    if (previewUrl) {
      setImgUrl(previewUrl);
    }
  }, [previewUrl]);

  return (
    <>
      <Sheet open={open} onOpenChange={(v) => {
        setOpen(v);
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
                    onClick={openFileDialog}
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
              {imgUrl && (
                <div className="inline-flex gap-2">
                  <img
                    className="rounded-lg h-48 object-cover w-full"
                    src={imgUrl || ""} alt="img" />
                </div>)}

            </div>
            <SheetFooter className="p-0">
              <Button type="submit"
                disabled={loading} onClick={submit}>Save</Button>
              <SheetClose asChild>
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="outline">Cancel</Button>
              </SheetClose>

            </SheetFooter>
          </SheetContent>
        </form>
      </Sheet>
    </>
  )
}

export default ImgBlockForm
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type props={
  type:"url"|"img"|"email",
  trigger:React.ReactNode,
  onSubmit?:(values:{type: string, title: string, url: string })=>Promise<void>,
  onUpdate?:()=>void,
  dialogTitle:string,
  inputTitle:string,
  inputPlaceholder:string,
}

const UrlButton = ({type,trigger,onSubmit,dialogTitle,inputTitle,inputPlaceholder}:props) => {
  const[loading,setLoading] =useState<boolean>(false)
  const [title,setTitle]=useState<string>("")
  const [url,setUrl]=useState<string>("")
  
  const submit=async()=>{
    try{
      setLoading(true)
       await onSubmit?.({type,title,url})
      
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
    
  }

  return (
   <>
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" >{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-card">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
             Add your information below, then click Save to apply changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input name="title" placeholder="Enter Title"
              onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="input">{inputTitle}</Label>
              <Input  name="input" placeholder={inputPlaceholder}
              onChange={(e)=>setUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading} onClick={submit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
   
   </>
  )
}

export default UrlButton
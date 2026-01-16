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
import { useEffect, useState } from "react"

type props={
  id?:string,
  type:"url"|"email",
  defaultValue?:{
    title:string,
    url:string
  },
  trigger:React.ReactNode,
  onSubmit?:(values:{type: string, title: string, url: string })=>Promise<void>,
  onUpdate?:(values:{id:string,title:string,url:string})=>Promise<void>,
}
const info={
  url:{
    dialogTitle:"URL Button",
    inputTitle:"URL",
    inputPlaceholder:"https://www.example.com",
    inputType:"text"
  },
  email:{
    dialogTitle:"Email Button",
    inputTitle:"Email",
    inputPlaceholder:"example@xyz.com",
    inputType:"email"
  }
}
const ButtonBlockForm = ({type,trigger,onSubmit,onUpdate,defaultValue,id}:props) => {
  const[loading,setLoading] =useState<boolean>(false)
  const[open,setOpen] =useState<boolean>(false)
  const [title,setTitle]=useState<string>("")
  const [url,setUrl]=useState<string>("")
  
  const submit=async()=>{
    try{
      setLoading(true)
       await onSubmit?.({type,title,url})

       if(id){
        await onUpdate?.({id,title,url})
       }
      setOpen(false)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
    
  }

  useEffect(()=>{
   if(defaultValue){
    setTitle(defaultValue.title)
    setUrl(defaultValue.url)
   } 
  },[])

  return (
   <>
    <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
      <form>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-card">
          <DialogHeader>
            <DialogTitle>{id? "Edit "+info[type].dialogTitle:info[type].dialogTitle}</DialogTitle>
            <DialogDescription>
             Add your information below, then click Save to apply changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input name="title" placeholder="Enter Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="input">{info[type].inputTitle}</Label>
              <Input  name="input"
              type={info[type].inputType}
              value={url}
              placeholder={info[type].inputPlaceholder}
              onChange={(e)=>setUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" 
            value={url}
            disabled={loading} onClick={submit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
   
   </>
  )
}

export default ButtonBlockForm
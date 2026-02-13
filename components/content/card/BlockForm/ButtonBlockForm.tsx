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
   <Sheet open={open} onOpenChange={()=>setOpen(!open)}>
      <form>
        <SheetTrigger asChild>
          {trigger}
        </SheetTrigger>
        <SheetContent
        side="left"
        className="bg-card p-4">
          <SheetHeader className="p-0">
            <SheetTitle>{id? "Edit "+info[type].dialogTitle:info[type].dialogTitle}</SheetTitle>
            <SheetDescription>
             Add your information below, then click Save to apply changes.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 mt-3">
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
          <SheetFooter className="p-0">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit" 
            value={url}
            disabled={loading} onClick={submit}>Save</Button>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
   </>
  )
}

export default ButtonBlockForm
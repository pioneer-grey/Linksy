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
import ButtonBlockForm from './BlockForm/ButtonBlockForm'
import ImgBlockForm from './BlockForm/ImgBlockForm'
import { Link,MailPlus,Image,Plus } from 'lucide-react';

const NewBlock = () => {

  return (
    <>
      <Dialog>
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
            <div className='flex flex-wrap justify-center items-center gap-2 '>
              <ButtonBlockForm
                trigger={
                  <div className='flex gap-2 items-center'>
                    <Button variant={"outline"}
                    type='button'>
                  <Link/>
                    <h1>URL Button</h1>
                    </Button>
                    
                  </div> 
                }
                type="url"
              />
              <ButtonBlockForm
                trigger={
                  <div className='flex gap-2 items-center'>
                    <Button variant={"outline"}
                    type='button'
                    >
                    <MailPlus/>
                    <h1>Email Button</h1>
                    </Button>
                    
                  </div> 
                }
                type="email"
              />
              <ImgBlockForm
              trigger={
                  <div className='flex gap-2 items-center'>
                    <Button variant={"outline"}
                    type='button'
                    >
                    <Image/>
                    <h1>Image Button</h1>
                    </Button>
                    
                  </div> 
                }
              
              />
              

            </div>
          </DialogContent>
      </Dialog>

    </>
  )
}

export default NewBlock
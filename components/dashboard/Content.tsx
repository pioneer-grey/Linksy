import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import UploadImg from './content/UploadImg';
import { ButtonGroup } from "@/components/ui/button-group"
import HeaderForm from './content/HeaderForm';
import { useHeader } from '@/store/useHeader';
const Content = () => {
    const {header}=useHeader()

    if(!header) return null
    
    return (
        <>
            <div className='bg-card max-h-screen h-full overflow-auto'>
                <header className='flex justify-center items-center  border-b p-4'>
                    <ButtonGroup>
                        <Input readOnly defaultValue={process.env.NEXT_PUBLIC_PROJECT_URL+(header?.userName ?? "")} />
                        <Button
                            className='bg-blue-500 text-white'
                            variant="default" aria-label="Search">
                            Publish
                        </Button>
                    </ButtonGroup>
                </header>
                {/* Header */}
                <div className='p-4 '>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="header"
                    >
                         <AccordionItem value="avatar">
                            <AccordionTrigger className='no-underline hover:no-underline decoration-none flex items-center gap-2'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={14} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Edit your avatar.
                                    </TooltipContent>
                                </Tooltip>
                                Profile</AccordionTrigger>
                            <AccordionContent className='h-auto'>
                              <UploadImg/>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="header">
                            <AccordionTrigger className='no-underline hover:no-underline decoration-none flex items-center gap-2'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={14} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Edit your name, and bio.
                                    </TooltipContent>
                                </Tooltip>
                                Header</AccordionTrigger>
                            <AccordionContent className='h-auto'>
                               <HeaderForm/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </div>

        </>
    )
}

export default Content
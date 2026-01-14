import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info} from 'lucide-react';
import { IconExternalLink } from '@tabler/icons-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import UploadImg from './content/UploadImg';
import { ButtonGroup } from "@/components/ui/button-group"
import HeaderForm from './content/HeaderForm';
import IconsForm from './content/IconsForm';
import { useIcon } from '@/store/useIcons'
import { getIcons} from '@/actions/Icons'
import { useHeader } from '@/store/useHeader';

const Content = () => {
    const{data,isLoading}=getIcons()
    const{setIcon,}=useIcon()
    const { header } = useHeader()
    
    React.useEffect(()=>{
        if(data?.icons){
            setIcon(data?.icons)
        }
    },[data])


    if (!header) return null

    return (
        <>
            <div className='bg-card max-h-screen h-full overflow-auto'>
                <header className='flex justify-center items-center  border-b p-4'>
                    <ButtonGroup>
                        <Input readOnly defaultValue={process.env.NEXT_PUBLIC_PROJECT_URL + (header?.userName ?? "")} />
                        <Button
                            variant="default" aria-label="visit">
                            <IconExternalLink/>
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
                                <UploadImg />
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
                                <HeaderForm />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="icons">
                            <AccordionTrigger className='no-underline hover:no-underline decoration-none flex items-center gap-2'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={14} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add Social Icons.
                                    </TooltipContent>
                                </Tooltip>
                                Icons</AccordionTrigger>
                            <AccordionContent className='h-auto'>
                                <IconsForm/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </div>

        </>
    )
}

export default Content
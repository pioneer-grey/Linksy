"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react';
import { IconExternalLink } from '@tabler/icons-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import UploadImg from '../content/Profile/UploadImg';
import { ButtonGroup } from "@/components/ui/button-group"
import HeaderForm from '../content/Header/HeaderForm';
import IconsForm from '../content/Icons/IconsForm';
import { useHeader } from '@/store/useHeader';
import CardForm from '../content/card/CardForm';
import { useIconhook } from "@/hooks/useIconhook";
import { useHeaderhook } from '@/hooks/useHeaderhook'


const Content = () => {
    useIconhook()
    useHeaderhook()

    const { header} = useHeader()
    if (!header) return null



    return (
        <>
            <div className='bg-card max-h-screen h-full overflow-auto'>
                <header className='flex justify-center items-center  border-b p-4'>
                    <ButtonGroup>
                        <Input readOnly defaultValue={process.env.NEXT_PUBLIC_PROJECT_URL + (header?.userName || "")} />
                        <Button
                            onClick={() => window.open("/" + (header.userName), "_blank")}
                            variant="default" aria-label="view">
                            <IconExternalLink />
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
                                <IconsForm />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="cards">
                            <AccordionTrigger className='no-underline hover:no-underline decoration-none flex items-center gap-2'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={14} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add Block.
                                    </TooltipContent>
                                </Tooltip>
                                Blocks</AccordionTrigger>
                            <AccordionContent className='h-auto'>
                                <CardForm />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </div>

        </>
    )
}

export default Content
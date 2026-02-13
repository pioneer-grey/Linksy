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
import { toast } from "sonner";
import { UploadAvatar } from "@/actions/header";
import { useIconhook } from "@/hooks/useIconhook";
import { useHeaderhook } from '@/hooks/useHeaderhook'


const Content = () => {
    useIconhook()
    useHeaderhook()

    const { header, setPicUrl } = useHeader()
    if (!header) return null

    const { mutateAsync, isPending } = UploadAvatar()

    const submitImg = async (file: File) => {
        try {
            const res = mutateAsync(file);
            toast.promise(res, {
                loading: "Uploading image...",
                success: "Image uploaded successfully",
                error: (err) => err.message || "Upload failed",
            });

            const result = await res;

            setPicUrl(result.picURL);

        } catch (err) {
            console.error("Upload failed:", err);
        }
    }

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
                                <UploadImg
                                    onSubmit={submitImg}
                                    isPending={isPending}
                                />
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
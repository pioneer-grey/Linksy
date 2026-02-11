import React from 'react'
import { useStyles } from '@/store/useStyles'
import Userdropdown from "@/components/user-dropdown"
import GeneralStyles from '../styles/GeneralStyles'
import HeaderStyles from '../styles/HeaderStyles'
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import CardStyles from '../styles/CardStyles'
import { Biohazard } from 'lucide-react'
import Link from 'next/link'
const Styles = () => {
  const { styles } = useStyles()

  if (!styles) return

  return (
    <div className='bg-card max-h-screen overflow-auto'>
      <header className='flex justify-between items-end w-full border-b p-4'>
        <Link href="/" className='flex items-center'>
        <Biohazard size={20} className="dark:text-white text-black"/>
          <h1 className='text-lg font-bold pl-2'>
          Linksy
        </h1>
        </Link>
      
        <div className='flex gap-2'>
     <AnimatedThemeToggler varient='outline'/>                
          <Userdropdown />
        </div>
      </header>
      <GeneralStyles/>
      <HeaderStyles/>
      <CardStyles/>
    </div>
  )
}

export default Styles
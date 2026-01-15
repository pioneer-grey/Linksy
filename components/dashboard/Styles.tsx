import React from 'react'
import { useStyles } from '@/store/useStyles'
import { ModeToggle } from "@/components/theme-mode"
import Userdropdown from "@/components/user-dropdown"
import GeneralStyles from '../styles/GeneralStyles'
import HeaderStyles from '../styles/HeaderStyles'
import CardStyles from '../styles/CardStyles'
const Styles = () => {
  const { styles } = useStyles()

  if (!styles) return

  return (
    <div className='bg-card max-h-screen overflow-auto'>
      <header className='flex justify-between items-end w-full border-b p-4'>
        <h1>
          Name
        </h1>
        <div className='flex gap-2'>
          <ModeToggle />
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
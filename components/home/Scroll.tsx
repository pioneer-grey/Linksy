import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";
import img_1 from "@/public/link-bio-2.png" 
import img_2 from "@/public/link-in-bio-3.png" 
import img_6 from "@/public/link-bio-7.png" 
const Scroll = () => {
  return (
    <section className="relative w-full overflow-hidden  px-4 py-16 md:py-24 lg:py-32">


      <div className="mx-auto max-w-7xl">
             <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mb-12 text-center md:mb-16"
>
  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
    Turn followers into customers
  </h2>
  <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
Linksy’s link in bio tool helps you navigate visitors directly to your social media channels, products, blogs, music, and other destinations that drive your business forward.   </p>
</motion.div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Feature 1 */}
  <div className='flex justify-center items-center'>
    <Image className='w-lg h-lg' src={img_1} alt='Customizable bio page UI' />
  </div>

  <div className='flex flex-col items-center justify-center'>
    <h1 className='bg-clip-text text-3xl font-bold tracking-tight md:mb-4 md:text-4xl lg:text-5xl'>
      Fully Customizable Bio Pages
    </h1>
    <p className='text-muted-foreground text-base md:text-lg'>
      Design your link-in-bio exactly how you want. Add links, branding, and layouts that match your identity.
    </p>
  </div>

  {/* Feature 2 */}
  <div className='hidden md:flex flex-col items-center justify-center'>
    <h1 className='bg-clip-text text-3xl font-bold tracking-tight md:mb-4 md:text-4xl lg:text-5xl'>
      Track Clicks & Performance
    </h1>
    <p className='text-muted-foreground text-base md:text-lg'>
      Get real-time insights into your audience. See what’s working and optimize your links for better engagement.
    </p>
  </div>

  <div className='flex justify-center items-center'>
    <Image src={img_2} alt='Analytics dashboard preview' />
  </div>

    <div className='flex md:hidden flex-col items-center justify-center'>
    <h1 className='bg-clip-text text-3xl font-bold tracking-tight md:mb-4 md:text-4xl lg:text-5xl'>
      Track Clicks & Performance
    </h1>
    <p className='text-muted-foreground text-base md:text-lg'>
      Get real-time insights into your audience. See what’s working and optimize your links for better engagement.
    </p>
  </div>


  {/* Feature 3 */}
  <div className='flex justify-center items-center'>
    <Image className='w-lg h-lg' src={img_6} alt='Mobile optimized bio page' />
  </div>

  <div className='flex flex-col items-center justify-center'>
    <h1 className='bg-clip-text text-3xl font-bold tracking-tight md:mb-4 md:text-4xl lg:text-5xl'>
      Optimized for Mobile & Speed
    </h1>
    <p className='text-muted-foreground text-base md:text-lg'>
      Lightning-fast pages that look perfect on any device, ensuring a seamless experience for your audience.
    </p>
  </div>

    </div>
    </div>
    </section>
  )
}

export default Scroll
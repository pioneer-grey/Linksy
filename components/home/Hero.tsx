import React from 'react'
import Navbar from './Navbar'
import Joy from "@/public/Joy.jpg"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
const Hero = () => {
    const router = useRouter()
    const placeholders = [
        `${process.env.NEXT_PUBLIC_PROJECT_URL}profile`,
        `${process.env.NEXT_PUBLIC_PROJECT_URL}username`,
        `${process.env.NEXT_PUBLIC_PROJECT_URL}social`,
        `${process.env.NEXT_PUBLIC_PROJECT_URL}link`,
    ];

    return (
        <>
            <Navbar />

            <div className="relative h-screen w-full overflow-hidden rounded-b-lg">
                <Image
                    // src={Joy_white}
                    src={Joy}
                    alt="Hero background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                    quality={100}
                />

                <div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-6 text-center dark:bg-black/90 bg-white/95">


                    <h1 className="text-4xl font-extrabold md:text-7xl leading-tight">
                        Turn Your Link<br className="hidden md:block" />
                        Into a Personal Brand
                    </h1>

                    <p className="max-w-lg text-sm md:text-base text-accent-foreground">
                        Create a clean, high-impact link-in-bio page that showcases who you are,
                        what you do, and where you’re going—without distractions.
                    </p>

                    <div className="w-full max-w-md flex items-center gap-2 mt-10">
                        <PlaceholdersAndVanishInput
                            onClick={() => router.push("/admin/dashboard")}
                            placeholders={placeholders}
                        />

                    </div>

                </div>
            </div>
            <div className='h-screen'>
                Subhan
            </div>
        </>

    )
}

export default Hero
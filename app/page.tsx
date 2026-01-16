"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export default function Page() {
    const route=useRouter()
    return (
        <div>
            <Button onClick={()=>route.push("/dashboard")}>DashBoard</Button>
        </div>
    )
}
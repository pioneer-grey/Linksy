import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { social,page } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { sql, eq } from "drizzle-orm";

export async function GET(){
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const userId=session.user.id
        const userNameresult =await db.select({
            userName:page.userName}).from(page).where(eq(page.userId,userId))
        
        const userName=userNameresult[0].userName

        const result=await db.select({
            id:social.id,
            url:social.url,
            type:social.type,
            order:social.order
        }).from(social).where(eq(social.userName,userName))
         .orderBy(social.order)
       
        return NextResponse.json({
            success:true,
            icons:result
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const { userName,icons } = await req.json()
    
        await db.transaction(async (tx) => {

            const [{ nextOrder }] = await tx.select({
                nextOrder: sql<number>`COALESCE(MAX(${social.order}),0)`,
            })
                .from(social)
                .where(eq(social.userName, userName))

            icons.forEach(async (s: string, index: number) => {
                await tx.insert(social).values({
                    userName,
                    type: s,
                    order: nextOrder + index + 1
                })
            })
        }
        )
        return NextResponse.json({
            success:true
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const {id} = await req.json()
    
       await db.delete(social).where(eq(social.id,id))
        return NextResponse.json({
            success:true,
            message:"Icon Successfully Deleted"
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
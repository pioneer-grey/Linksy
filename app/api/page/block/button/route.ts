import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import {block } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { sql, eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user.userName) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }

        const userName = session.user.userName

        const { type, title, url } = await req.json()

        const blockResult=await db.transaction(async (tx) => {

            const [{ nextOrder }] = await tx.select({
                nextOrder: sql<number>`COALESCE(MAX(${block.order}),0)`,
            })
                .from(block)
                .where(eq(block.userName, userName))

           const result= await tx.insert(block).values({
                userName,
                type: type,
                title: title,
                url: url,
                order: nextOrder + 1
            }).returning({ 
            id:block.id,
            title:block.title,
            type:block.type,
            url:block.url,
            order:block.order,})

           return result 
        })
        return NextResponse.json({
            block:blockResult[0]
        })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}




export async function PUT(req: NextRequest) {
    try {
         const session = await auth.api.getSession({
            headers: await headers()
        })
        
         if (!session?.user.userName) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }
         const userName = session.user.userName

        const { id, title, url } = await req.json()


        await db.update(block).set({
            title: title,
            url: url
        }).where(and(eq(block.id, id),eq(block.userName,userName)))



        return NextResponse.json({
            message: "Blocks Updated",
            success: true
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

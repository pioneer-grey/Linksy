import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { social} from "@/db/schema";
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

        const userName = session?.user?.userName

        const { icons } = await req.json()

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
            })
            
         const socialResult = await db.select({
            id:social.id,
            type:social.type,
            url:social.url,
            order:social.order,
        }).from(social).where(eq(social.userName, userName)).orderBy(social.order);
       
        return NextResponse.json({
            icons:socialResult
        })

    }
    catch (err) {
        console.log(err)
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
       if (!session?.user.userName) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }


        const userName= session.user.userName
        const { id } = await req.json()

        await db.delete(social).where(and(eq(social.id, id),eq(social.userName,userName)))

        return NextResponse.json({
            success: true,
            message: "Icon Successfully Deleted"
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

export async function PUT(req:NextRequest){
     try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user.userName) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }


        const userName=session.user.userName

        const {icons}=await req.json()

        for(const i of icons){
            await db.update(social).set({
                url:i.url,
                order:i.order
            })
            .where(and(eq(social.id,i.id),eq(social.userName,userName)))
        }

        return NextResponse.json({
            success: true,
            message:"Icons Updated"
        })

    }
    catch(err) {
        console.log(err)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
    
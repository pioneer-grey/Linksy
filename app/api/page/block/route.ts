import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import { page, block } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { sql, eq } from "drizzle-orm";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const userId = session.user.id
        const userNameresult = await db.select({
            userName: page.userName
        }).from(page).where(eq(page.userId, userId))

        const userName = userNameresult[0].userName

        const result = await db.select({
            id: block.id,
            title: block.title,
            url: block.url,
            type: block.type,
            order: block.order,
        }).from(block).where(eq(block.userName, userName))
            .orderBy(block.order)


        return NextResponse.json({
            success: true,
            blocks: result
        })
    }
    catch (err) {
        console.log(err)
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

        const userId = session.user.id
        const userNameresult = await db.select({
            userName: page.userName
        }).from(page).where(eq(page.userId, userId))

        const userName = userNameresult[0].userName

        const { type, title, url } = await req.json()

        await db.transaction(async (tx) => {

            const [{ nextOrder }] = await tx.select({
                nextOrder: sql<number>`COALESCE(MAX(${block.order}),0)`,
            })
                .from(block)
                .where(eq(block.userName, userName))

            await tx.insert(block).values({
                userName,
                type: type,
                title: title,
                url: url,
                order: nextOrder + 1
            })
        })
        return NextResponse.json({
            message: "Block Created ",
            success: true,
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
        if (!session?.user?.id) return NextResponse.error();

        const { id } = await req.json()
        await db.delete(block).where(eq(block.id, id))

        return NextResponse.json({
            message: "Block Deleted",
            success: true
        })

    }
    catch {
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
        if (!session?.user?.id) return NextResponse.error();

        const { id, title, url } = await req.json()


        await db.update(block).set({
            title: title,
            url: url
        }).where(eq(block.id, id))



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

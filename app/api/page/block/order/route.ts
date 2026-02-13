import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { block } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

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

        const { blocks } = await req.json()
        for (const b of blocks) {
            await db.update(block).set({
                order: b.order
            })
                .where(and(eq(block.id, b.id),eq(block.userName,userName)))
        }

        return NextResponse.json({
            success: true,
            message: "Blocks Order Updated"
        })

    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

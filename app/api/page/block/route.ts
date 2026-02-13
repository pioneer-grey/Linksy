import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import {block } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { sql, eq, and } from "drizzle-orm";


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
         const userName = session.user.userName

        const { id } = await req.json()
        await db.delete(block).where(and(eq(block.id, id),eq(block.userName,userName)))

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
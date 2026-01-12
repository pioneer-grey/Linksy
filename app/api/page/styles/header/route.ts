import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { page } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();
        const styles = await req.json()
        const userName = styles.userName

        await db
            .update(page)
            .set({
            profilePictureShadow: styles.profilePictureShadow,
            profilePictureBorder: styles.profilePictureBorder,
            socialIconSize: styles.socialIconSize,
            })
            .where(eq(page.userName, userName));
            
            return NextResponse.json({ success: true,});
    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import { page, social, block, header } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: userName } = await params

        const [pageResult, headerResult, socialResult, blockResult] =
            await Promise.all([
                db.select().from(page).where(eq(page.userName, userName)).limit(1),
                db.select().from(header).where(eq(header.userName, userName)).limit(1),
                db.select().from(social).where(eq(social.userName, userName)),
                db.select().from(block).where(eq(block.userName, userName)),
            ])
        return NextResponse.json({
            styles: pageResult[0],
            header: headerResult[0],
            social: socialResult,
            block: blockResult,
        })

    }
    catch (err: any) {
        return NextResponse.json({
            error: err
        })
    }
}
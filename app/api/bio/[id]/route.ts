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

        const { styleResult, headerResult, 
            socialResult, blockResult } =

            await db.transaction(async (tx) => {

                const styleResult = await tx.select({
                    userName: page.userName,
                    primaryTextColor: page.primaryTextColor,
                    primaryBackground: page.primaryBackground,
                    desktopBackgroundColor: page.desktopBackgroundColor,
                    profilePictureShadow: page.profilePictureShadow,
                    profilePictureBorder: page.profilePictureBorder,
                    socialIconSize: page.socialIconSize,
                    cardColor: page.cardColor,
                    cardTextColor: page.cardTextColor,
                    cardCorner: page.cardCorner,
                    cardBorder: page.cardBorder,
                    cardBorderColor: page.cardBorderColor,
                    cardShadow: page.cardShadow,
                    cardSpacing: page.cardSpacing
                }).from(page).where(eq(page.userName, userName))

                const headerResult = await tx.select().from(header).where(eq(header.userName, userName))

                const socialResult = await tx.select({
                    id: social.id,
                    type: social.type,
                    url: social.url,
                    order: social.order,
                }).from(social).where(eq(social.userName, userName)).orderBy(social.order);

                const blockResult = await tx.select({
                    id: block.id,
                    title: block.title,
                    type: block.type,
                    url: block.url,
                    imgURL: block.imgURL,
                    order: block.order,
                }).from(block).where(eq(block.userName, userName)).orderBy(block.order);
                return { socialResult, styleResult, headerResult, blockResult }

            })

        if (styleResult.length == 0) {
            return NextResponse.json(
                { error: "Not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            styles: styleResult[0],
            header: headerResult[0],
            icon: socialResult,
            block: blockResult,
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
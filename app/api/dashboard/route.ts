import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { page, header, social, block } from "@/db/schema"
import { eq } from "drizzle-orm";



export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }

        if(!session.user.userName){
            return NextResponse.json({
                success: false
            })
        }
        
        const userId = session?.user.id as string
        const username=session.user.userName

        const {styleResult,headerResult,
            socialResult,blockResult}= await db.transaction(async(tx)=>{
            
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
        }).from(page).where(eq(page.userId, userId))

        const headerResult = await tx.select().from(header).where(eq(header.userName, username))
       
        const socialResult = await tx.select({
            id:social.id,
            type:social.type,
            url:social.url,
            order:social.order,
        }).from(social).where(eq(social.userName, username)).orderBy(social.order);
       
        const blockResult = await tx.select({
             id:block.id,
            title:block.title,
            type:block.type,
            url:block.url,
            imgURL:block.imgURL,
            order:block.order,
        }).from(block).where(eq(block.userName, username)).orderBy(block.order);

        return {socialResult,styleResult,headerResult,blockResult}
            })
       

        return NextResponse.json({
            success: true,
            styles: styleResult[0],
            header: headerResult[0],
            icons: socialResult,
            blocks: blockResult,
        })
    }
    catch(err) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }

}
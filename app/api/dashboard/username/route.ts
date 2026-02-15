import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { page, header, user, social, block } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {

        const {userName}=await req.json()

        if (!userName || typeof userName !== 'string' || userName.trim().length === 0) {
            return NextResponse.json({
                message: "Invalid username"
            }, { status: 400 })
        }

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
        }

        const userId = session?.user.id as string

        const result = await db.select({ userName: user.userName }).from(user).where(eq( user.userName,userName))

        if (result.length > 0) {
            return NextResponse.json({
                message: "Username is taken"
            }, { status: 400 })
        }
       
        await db.transaction(async(db)=>{

             await db.update(user).set({
            userName: userName
        }).where(eq(user.id, userId))

        // Default Template
              // Styles

            await db.insert(page).values({
            userId: userId,
            userName: userName,
            cardBorder: 0,
            cardBorderColor: "#d2acac",
            cardColor: "#e67579",
            cardCorner: 10,
            cardShadow: 5,
            cardSpacing: 8,
            cardTextColor: "#fdf7f7",
            desktopBackgroundColor: "#ffeadd",
            primaryBackground: "#b6495c",
            primaryTextColor: "#ffffff",
            profilePictureBorder: 2,
            profilePictureShadow: 4,
            socialIconSize: 24,
        })

        // BLocks
        await db.insert(block).values([
            {userName: userName,  title: 'Profile', type: 'url', order: 1 },
            {userName: userName,  title: 'Email', type: 'email', order: 2},
            {userName: userName,  title: 'Buy now (50% Discount)', type: 'img', imgURL: 'https://rvykeubighpbuvidmbyh.supabase.co/storage/v1/object/public/buttonImg/1771173495701-button.jpg', order: 3  },
        ])
        // Icons
        await db.insert(social).values([
            { userName: userName, type: 'fb', order: 1 },
            { userName: userName, type: 'insta', order: 2 },
            { userName: userName, type: 'tiktok', order: 3 },
            { userName: userName, type: 'x', order: 4 }
        ])
        // Headers
        await db.insert(header).values({
            userName: userName,
            name: `@${userName}`,
            bio: "Turning ideas into usable things."
        })

        })
       
        return NextResponse.json({
            message: "Success"
        })
    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
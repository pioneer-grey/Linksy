import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { header} from "@/db/schema"
import { eq } from "drizzle-orm";

export async function PUT(req:NextRequest){
    try {   
            const session = await auth.api.getSession({
                headers: await headers()
            })
            if (!session?.user?.userName) {
                return NextResponse.json({
                message: "Unauthorized user",

            }, { status: 401 })
            }

            const userName=session.user.userName

            const {name,bio}=await req.json()
            
            await db
                .update(header)
                .set({ name:name,
                    bio:bio
                 })
                .where(eq(header.userName, userName))
    
            return NextResponse.json({
                message:"Header Updated"
            },{status:200});
        }
        catch {
            return NextResponse.json({
                message: "Internal Server Error"
            }, { status: 500 })
        }
}
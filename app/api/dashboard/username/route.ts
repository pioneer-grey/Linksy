import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import {page,header,user} from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    try{
    const {userName}= await req.json()

     const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session){
        return NextResponse.json({
            message:"Unauthorized user",

        },{status:401})
    }
    
    const userId=session?.user.id as string

    const result=await db.select({userName:user.userName}).from(user).where(eq(userName,user.userName))

    if(result.length>0){
        return NextResponse.json({
            message:"Username is taken"
        },{status:400})
    }
    await db.update(user).set({
        userName:userName
    }).where(eq(user.id,userId))

    // Default Template
    await db.insert(page).values({
        userId:userId,
        userName:userName
    })

    await db.insert(header).values({
        userName:userName,
        name:"@username",
        bio:"Turning ideas into usable things."
    })

    return NextResponse.json({
        message:"Success"
    })
}
catch{
    return NextResponse.json({
        message:"Internal Server Error"
    },{status:500})
}
}
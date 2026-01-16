import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import {block } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import {eq } from "drizzle-orm";

export async function PUT(req:NextRequest){
     try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const {blocks}=await req.json()
        for(const b of blocks){
            await db.update(block).set({
                order:b.order
            })
            .where(eq(block.id,b.id))
        }

        return NextResponse.json({
            success: true,
            message:"Blocks Order Updated"
        })

    }
    catch(err) {
        console.log(err)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
    
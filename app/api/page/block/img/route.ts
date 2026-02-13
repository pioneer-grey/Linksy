import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import { createClient } from "@supabase/supabase-js";
import {block } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { sql, eq, and } from "drizzle-orm";

const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseService=process.env.SUPABASE_SERVICE_ROLE_KEY!

if(!supabaseService || !supabaseUrl){
    throw new Error("Supabase varibles are missing ")
}
const supabase = createClient(
   supabaseUrl,
    supabaseService
);


export async function POST(req: NextRequest) {
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

        const formdata = await req.formData()

        const img=formdata.get("img") as File
        const title=formdata.get("title") as string
        const url=formdata.get("url") as string 

        if(!img){
            return NextResponse.json({
                message:"Image is missing "
            },{status:401})
        }

        const imgFileName = `${Date.now()}-button.jpg`;

          const { error: imgError } = await supabase.storage
                    .from("buttonImg")
                    .upload(imgFileName, img, {
                        contentType: "image/jpeg",
                    });
        
                if (imgError) {
                    return NextResponse.json({
                        message:"Faild to upload image",
                    },{status:401})
                }
        
                const { data: imgUrlData } = supabase.storage
                    .from("buttonImg")
                    .getPublicUrl(imgFileName);

                const imgUrl = imgUrlData.publicUrl;

        const blockResult=await db.transaction(async (tx) => {

            const [{ nextOrder }] = await tx.select({
                nextOrder: sql<number>`COALESCE(MAX(${block.order}),0)`,
            })
                .from(block)
                .where(eq(block.userName, userName))

           const result= await tx.insert(block).values({
                userName,
                type: "img",
                imgURL:imgUrl,
                title: title,
                url: url,
                order: nextOrder + 1
            }).returning({ 
            id:block.id,
            title:block.title,
            type:block.type,
            url:block.url,
            imgURL:block.imgURL,
            order:block.order,})

           return result 
        })
        return NextResponse.json({
            block:blockResult[0]
        })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}


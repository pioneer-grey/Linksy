import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { createClient } from "@supabase/supabase-js";
import { header} from "@/db/schema"
import { eq } from "drizzle-orm";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(req: NextRequest) {
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

        const formData = await req.formData()
        const avatar = formData.get("avatar") as File;
        const avatarFileName = `${Date.now()}-avatar.jpg`;

        const { error: avatarError } = await supabase.storage
            .from("profile")
            .upload(avatarFileName, avatar, {
                contentType: "image/jpeg",
            });

        if (avatarError) {
            return NextResponse.json({
                message:"Faild to upload Profile image",
            },{status:401})
        }

        const { data: avatarUrlData } = supabase.storage
            .from("profile")
            .getPublicUrl(avatarFileName);
        const avatarUrl = avatarUrlData.publicUrl;

        await db
            .update(header)
            .set({ picURL: avatarUrl })
            .where(eq(header.userName, userName));

        return NextResponse.json({picURL: avatarUrl },{status:200});
    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }

}
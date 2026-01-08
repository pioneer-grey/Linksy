"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export async function SignupAction(name:string,email:string,password:string){
    await auth.api.signUpEmail({
        body:{
            email,
            password,
            name
        }
    })
    redirect("/dashboard")
}
export async function SigninAction(email:string,password:string){
    await auth.api.signInEmail({
        body:{
            email,
            password,
        }
    })
    redirect("/dashboard")
}

export async function SignoutAction(){
   await auth.api.signOut({
    headers:await headers()
   })
    redirect("/")
}

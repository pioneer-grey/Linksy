"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function SignupAction(
  name: string,
  email: string,
  password: string
) {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    })

    
  } catch (error: any) {
    console.error("Signup error:", error)
    throw new Error(error?.message || "Signup failed")
  }
}


export async function SigninAction(email: string, password: string) {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(), 
    })

  } catch (error: any) {
    console.error("Signin error:", error)
    throw new Error(error?.message || "Invalid email or password")
  }
}

export async function SignoutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    })
  } catch (error) {
    console.error("Signout error:", error)
  }

  redirect("/")
}
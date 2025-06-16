import { type NextRequest, NextResponse } from "next/server"
import { registerUser, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const user = await registerUser(email, password, name)
    const token = generateToken(user)

    return NextResponse.json({
      success: true,
      user,
      token,
    })
  } catch (error: any) {
    console.error("Registration error:", error)

    if (error.message === "User already exists") {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

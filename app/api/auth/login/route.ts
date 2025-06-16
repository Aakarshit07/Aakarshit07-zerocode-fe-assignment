import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Login request received:", { email: body.email })

    const { email, password } = body

    if (!email || !password) {
      console.log("Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("Attempting to authenticate user:", email)
    const user = await authenticateUser(email, password)

    if (!user) {
      console.log("Authentication failed for:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("Authentication successful for:", email)
    const token = generateToken(user)

    return NextResponse.json({
      success: true,
      user,
      token,
    })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

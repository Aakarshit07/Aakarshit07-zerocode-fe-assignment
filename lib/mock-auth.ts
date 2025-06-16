import type { User } from "./types"

// Mock users database
const mockUsers: User[] = [
  {
    id: "demo-user-1",
    email: "demo@zerocode.com",
    name: "Demo User",
    createdAt: new Date(),
  },
  {
    id: "user-2",
    email: "test@example.com",
    name: "Test User",
    createdAt: new Date(),
  },
]

const mockPasswords: Record<string, string> = {
  "demo@zerocode.com": "demo123",
  "test@example.com": "password123",
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function mockLogin(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  console.log("🔍 Mock login attempt:", email)

  // Simulate network delay
  await delay(500)

  const user = mockUsers.find((u) => u.email === email)
  if (!user) {
    console.log("❌ User not found:", email)
    return { success: false, error: "Invalid credentials" }
  }

  const correctPassword = mockPasswords[email]
  if (password !== correctPassword) {
    console.log("❌ Invalid password for:", email)
    return { success: false, error: "Invalid credentials" }
  }

  // Generate a mock JWT token
  const token = btoa(JSON.stringify({ userId: user.id, email: user.email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }))

  console.log("✅ Login successful:", email)
  return { success: true, user, token }
}

export async function mockRegister(
  email: string,
  password: string,
  name: string,
): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  console.log("🔍 Mock register attempt:", email)

  // Simulate network delay
  await delay(500)

  const existingUser = mockUsers.find((u) => u.email === email)
  if (existingUser) {
    console.log("❌ User already exists:", email)
    return { success: false, error: "User already exists" }
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" }
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    createdAt: new Date(),
  }

  mockUsers.push(newUser)
  mockPasswords[email] = password

  // Generate a mock JWT token
  const token = btoa(
    JSON.stringify({ userId: newUser.id, email: newUser.email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }),
  )

  console.log("✅ Registration successful:", email)
  return { success: true, user: newUser, token }
}

export function mockVerifyToken(token: string): { success: boolean; user?: User; error?: string } {
  try {
    const decoded = JSON.parse(atob(token))

    // Check if token is expired
    if (decoded.exp < Date.now()) {
      return { success: false, error: "Token expired" }
    }

    const user = mockUsers.find((u) => u.id === decoded.userId)
    if (!user) {
      return { success: false, error: "User not found" }
    }

    return { success: true, user }
  } catch (error) {
    return { success: false, error: "Invalid token" }
  }
}

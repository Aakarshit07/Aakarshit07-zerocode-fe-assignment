export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  userId: string
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface PromptTemplate {
  id: string
  title: string
  content: string
  category: string
}

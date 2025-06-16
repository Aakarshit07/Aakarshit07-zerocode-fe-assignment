import { verifyToken } from "@/lib/auth"

export const maxDuration = 30

// Simulated AI responses
const simulatedResponses = [
  "That's an interesting question! Let me think about that for a moment.",
  "I understand what you're asking. Here's my perspective on that topic.",
  "Great point! I'd be happy to help you with that.",
  "That's a complex topic. Let me break it down for you.",
  "I see what you mean. Here's how I would approach that problem.",
  "Excellent question! This is something I've been thinking about recently.",
  "That's a fascinating topic. Let me share some insights with you.",
  "I appreciate you bringing this up. Here's what I think about it.",
  "That's a really good observation. Let me elaborate on that.",
  "Interesting perspective! I'd like to add to what you've said.",
]

const topicResponses: Record<string, string[]> = {
  code: [
    "Here's a clean approach to solve that coding problem. First, let's break down the requirements...",
    "That's a common programming challenge. I'd recommend using a modular approach...",
    "Great coding question! The key is to think about the data structure first...",
    "For this programming task, I'd suggest starting with pseudocode...",
  ],
  help: [
    "I'm here to help! What specific area would you like assistance with?",
    "Of course! I'd be happy to guide you through this step by step.",
    "Let me help you with that. What's the main challenge you're facing?",
    "I'm glad you asked! Here's how we can tackle this together...",
  ],
  hello: [
    "Hello! It's great to meet you. How can I assist you today?",
    "Hi there! I'm excited to chat with you. What's on your mind?",
    "Hello! Welcome to our conversation. What would you like to explore?",
    "Hey! Thanks for reaching out. How can I help you today?",
  ],
  default: simulatedResponses,
}

function getSimulatedResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("code") || lowerMessage.includes("program") || lowerMessage.includes("function")) {
    const responses = topicResponses.code
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (lowerMessage.includes("help") || lowerMessage.includes("assist") || lowerMessage.includes("support")) {
    const responses = topicResponses.help
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    const responses = topicResponses.hello
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const responses = topicResponses.default
  return responses[Math.floor(Math.random() * responses.length)]
}

function createStreamingResponse(text: string) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const words = text.split(" ")
      let index = 0

      const sendWord = () => {
        if (index < words.length) {
          const word = words[index] + (index < words.length - 1 ? " " : "")
          const chunk = `0:"${word}"\n`
          controller.enqueue(encoder.encode(chunk))
          index++

          // Simulate typing delay
          setTimeout(sendWord, 50 + Math.random() * 100)
        } else {
          // Send completion signal
          controller.enqueue(
            encoder.encode('d:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20}}\n'),
          )
          controller.close()
        }
      }

      // Start sending words after a brief delay
      setTimeout(sendWord, 200)
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Vercel-AI-Data-Stream": "v1",
    },
  })
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return new Response("Invalid token", { status: 401 })
    }

    const { messages } = await req.json()

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage?.content || "Hello"

    // Generate simulated response
    const aiResponse = getSimulatedResponse(userMessage)

    // Return streaming response
    return createStreamingResponse(aiResponse)
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}

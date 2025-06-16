// Mock chat responses
const mockResponses = [
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
    "Here's a clean approach to solve that coding problem. First, let's break down the requirements and identify the key components we need to implement.",
    "That's a common programming challenge. I'd recommend using a modular approach with proper error handling and clear documentation.",
    "Great coding question! The key is to think about the data structure first, then implement the algorithm step by step.",
    "For this programming task, I'd suggest starting with pseudocode to outline the logic before diving into the actual implementation.",
  ],
  help: [
    "I'm here to help! What specific area would you like assistance with? Feel free to provide more details about your challenge.",
    "Of course! I'd be happy to guide you through this step by step. Let's start with understanding your current situation.",
    "Let me help you with that. What's the main challenge you're facing? I can provide targeted advice based on your needs.",
    "I'm glad you asked! Here's how we can tackle this together. First, let's identify the core issue and then work on solutions.",
  ],
  hello: [
    "Hello! It's great to meet you. How can I assist you today? I'm here to help with any questions or tasks you have.",
    "Hi there! I'm excited to chat with you. What's on your mind? Whether it's work, learning, or just conversation, I'm ready to help.",
    "Hello! Welcome to our conversation. What would you like to explore today? I can help with various topics and tasks.",
    "Hey! Thanks for reaching out. How can I help you today? I'm here to provide assistance, answer questions, or just have a friendly chat.",
  ],
  default: mockResponses,
}

function getContextualResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (
    lowerMessage.includes("code") ||
    lowerMessage.includes("program") ||
    lowerMessage.includes("function") ||
    lowerMessage.includes("javascript") ||
    lowerMessage.includes("python")
  ) {
    const responses = topicResponses.code
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (
    lowerMessage.includes("help") ||
    lowerMessage.includes("assist") ||
    lowerMessage.includes("support") ||
    lowerMessage.includes("problem")
  ) {
    const responses = topicResponses.help
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey") ||
    lowerMessage.includes("good morning") ||
    lowerMessage.includes("good afternoon")
  ) {
    const responses = topicResponses.hello
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const responses = topicResponses.default
  return responses[Math.floor(Math.random() * responses.length)]
}

export async function mockChatResponse(message: string): Promise<string> {
  // Simulate thinking time
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 700))

  return getContextualResponse(message)
}

export function createMockStreamingResponse(text: string, onChunk: (chunk: string) => void, onComplete: () => void) {
  const words = text.split(" ")
  let index = 0

  const sendWord = () => {
    if (index < words.length) {
      const word = words[index] + (index < words.length - 1 ? " " : "")
      onChunk(word)
      index++

      // Simulate typing delay
      setTimeout(sendWord, 50 + Math.random() * 100)
    } else {
      onComplete()
    }
  }

  // Start sending words after a brief delay
  setTimeout(sendWord, 200)
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Chat } from "./types" // Assuming Chat is defined in a types file

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function exportChatAsJSON(chat: Chat): void {
  const dataStr = JSON.stringify(chat, null, 2)
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

  const exportFileDefaultName = `chat-${chat.title}-${new Date().toISOString().split("T")[0]}.json`

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href", dataUri)
  linkElement.setAttribute("download", exportFileDefaultName)
  linkElement.click()
}

export function exportChatAsMarkdown(chat: Chat): void {
  const markdown = chat.messages
    .map((msg) => `**${msg.role === "user" ? "You" : "Assistant"}:** ${msg.content}`)
    .join("\n\n")

  const dataStr = `# ${chat.title}\n\n${markdown}`
  const dataUri = "data:text/markdown;charset=utf-8," + encodeURIComponent(dataStr)

  const exportFileDefaultName = `chat-${chat.title}-${new Date().toISOString().split("T")[0]}.md`

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href", dataUri)
  linkElement.setAttribute("download", exportFileDefaultName)
  linkElement.click()
}

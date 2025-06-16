import type { PromptTemplate } from "./types"

export const promptTemplates: PromptTemplate[] = [
  {
    id: "1",
    title: "Code Review",
    content: "Please review this code and provide feedback on best practices, potential issues, and improvements:",
    category: "Development",
  },
  {
    id: "2",
    title: "Email Draft",
    content: "Help me write a professional email for:",
    category: "Communication",
  },
  {
    id: "3",
    title: "Explain Concept",
    content: "Explain this concept in simple terms with examples:",
    category: "Education",
  },
  {
    id: "4",
    title: "Brainstorm Ideas",
    content: "Help me brainstorm creative ideas for:",
    category: "Creative",
  },
  {
    id: "5",
    title: "Debug Issue",
    content: "I'm having trouble with this code. Can you help me debug it?",
    category: "Development",
  },
  {
    id: "6",
    title: "Meeting Summary",
    content: "Please summarize the key points from this meeting transcript:",
    category: "Business",
  },
]

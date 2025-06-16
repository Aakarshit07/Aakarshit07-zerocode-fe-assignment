"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Mic, MicOff, Download, FileText, Sparkles } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useVoiceInput } from "@/hooks/use-voice-input"
import { formatDate, exportChatAsJSON, exportChatAsMarkdown, generateId } from "@/lib/utils"
import { promptTemplates } from "@/lib/prompt-templates"
import { PromptTemplates } from "./prompt-templates"
import { mockChatResponse, createMockStreamingResponse } from "@/lib/mock-chat"
import type { Message } from "@/lib/types"

export function ChatInterface() {
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [inputHistory, setInputHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showTemplates, setShowTemplates] = useState(false)

  const { isListening, transcript, isSupported, startListening, stopListening } = useVoiceInput()

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle voice input
  useEffect(() => {
    if (transcript && !isListening) {
      setInput((prev) => prev + transcript)
    }
  }, [transcript, isListening])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: generateId(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
      userId: user?.id || "",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputHistory((prev) => [input.trim(), ...prev.slice(0, 19)])
    setHistoryIndex(-1)
    const currentInput = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      // Get mock response
      const responseText = await mockChatResponse(currentInput)

      const assistantMessage: Message = {
        id: generateId(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
        userId: user?.id || "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Simulate streaming response
      createMockStreamingResponse(
        responseText,
        (chunk: string) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: msg.content + chunk } : msg)),
          )
        },
        () => {
          setIsLoading(false)
        },
      )
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: generateId(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
        userId: user?.id || "",
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && inputHistory.length > 0) {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, inputHistory.length - 1)
      setHistoryIndex(newIndex)
      setInput(inputHistory[newIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(inputHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  const handleTemplateSelect = (template: string) => {
    setInput(template)
    setShowTemplates(false)
  }

  const handleExportJSON = () => {
    const chatData = {
      id: Date.now().toString(),
      title: `Chat ${formatDate(new Date())}`,
      messages,
      userId: user?.id || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    exportChatAsJSON(chatData)
  }

  const handleExportMarkdown = () => {
    const chatData = {
      id: Date.now().toString(),
      title: `Chat ${formatDate(new Date())}`,
      messages,
      userId: user?.id || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    exportChatAsMarkdown(chatData)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Chat Assistant</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowTemplates(!showTemplates)}>
            <Sparkles className="h-4 w-4 mr-2" />
            Templates
          </Button>
          {messages.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={handleExportJSON}>
                <Download className="h-4 w-4 mr-2" />
                JSON
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
                <FileText className="h-4 w-4 mr-2" />
                Markdown
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Prompt Templates */}
      {showTemplates && (
        <PromptTemplates
          templates={promptTemplates}
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-lg mb-2">Welcome to ZeroCode Chat!</p>
            <p>Start a conversation or use a prompt template to get started.</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-[80%] p-4 ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs opacity-70 mt-2">{formatDate(message.timestamp)}</div>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-muted p-4">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">Thinking...</div>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="pr-12"
            />
            {isSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 ${
                  isListening ? "text-red-500" : ""
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            )}
          </div>
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        {inputHistory.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">Use ↑/↓ arrows to navigate input history</p>
        )}
      </div>
    </div>
  )
}

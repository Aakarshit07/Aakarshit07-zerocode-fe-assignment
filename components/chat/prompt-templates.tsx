"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { PromptTemplate } from "@/lib/types"

interface PromptTemplatesProps {
  templates: PromptTemplate[]
  onSelect: (content: string) => void
  onClose: () => void
}

export function PromptTemplates({ templates, onSelect, onClose }: PromptTemplatesProps) {
  const categories = Array.from(new Set(templates.map((t) => t.category)))

  return (
    <div className="border-b bg-muted/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Prompt Templates</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category}>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {templates
                .filter((t) => t.category === category)
                .map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => onSelect(template.content)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground line-clamp-2">{template.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2, Edit, DollarSign, User } from "lucide-react"
import { format } from "date-fns"
import type { Deal, PipelineStage, Contact } from "@/lib/types"
import { updateDeal, deleteDeal } from "@/app/actions/deals"
import { EditDealDialog } from "./edit-deal-dialog"
import { cn } from "@/lib/utils"

interface PipelineBoardProps {
  stages: PipelineStage[]
  deals: (Deal & { contact: Pick<Contact, "id" | "first_name" | "last_name" | "email"> | null })[]
  contacts: Pick<Contact, "id" | "first_name" | "last_name">[]
}

export function PipelineBoard({ stages, deals, contacts }: PipelineBoardProps) {
  const [editDeal, setEditDeal] = useState<Deal | null>(null)
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null)
  const router = useRouter()

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedDeal(dealId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = async (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    if (draggedDeal) {
      await updateDeal(draggedDeal, { stage_id: stageId })
      router.refresh()
    }
    setDraggedDeal(null)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      await deleteDeal(id)
      router.refresh()
    }
  }

  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage_id === stageId)
  }

  const getStageTotal = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + Number(deal.value || 0), 0)
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <CardTitle className="text-sm font-medium">
                      {stage.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {getDealsByStage(stage.id).length}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  ${getStageTotal(stage.id).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-3 min-h-[400px]">
                {getDealsByStage(stage.id).map((deal) => (
                  <Card
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    className={cn(
                      "cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md",
                      draggedDeal === deal.id && "opacity-50"
                    )}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{deal.title}</p>
                          {deal.contact && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <User className="h-3 w-3" />
                              {deal.contact.first_name} {deal.contact.last_name}
                            </p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditDeal(deal)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(deal.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t">
                        <span className="text-sm font-semibold flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {Number(deal.value).toLocaleString()}
                        </span>
                        {deal.expected_close_date && (
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(deal.expected_close_date), "MMM d")}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {editDeal && (
        <EditDealDialog
          deal={editDeal}
          stages={stages}
          contacts={contacts}
          open={!!editDeal}
          onOpenChange={(open) => !open && setEditDeal(null)}
        />
      )}
    </>
  )
}

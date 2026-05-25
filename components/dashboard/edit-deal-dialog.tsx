"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateDeal } from "@/app/actions/deals"
import type { Deal, PipelineStage, Contact } from "@/lib/types"

interface EditDealDialogProps {
  deal: Deal
  stages: PipelineStage[]
  contacts: Pick<Contact, "id" | "first_name" | "last_name">[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditDealDialog({ deal, stages, contacts, open, onOpenChange }: EditDealDialogProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      value: Number(formData.get("value")) || 0,
      contact_id: formData.get("contact_id") as string || null,
      stage_id: formData.get("stage_id") as string,
      expected_close_date: formData.get("expected_close_date") as string || null,
      probability: Number(formData.get("probability")) || 50,
      notes: formData.get("notes") as string || null,
    }

    await updateDeal(deal.id, data)
    setLoading(false)
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Deal</DialogTitle>
            <DialogDescription>
              Update deal information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_title">Deal Title *</Label>
              <Input 
                id="edit_title" 
                name="title" 
                required 
                defaultValue={deal.title}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_value">Value ($)</Label>
                <Input 
                  id="edit_value" 
                  name="value" 
                  type="number" 
                  min="0" 
                  step="0.01"
                  defaultValue={deal.value}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_probability">Probability (%)</Label>
                <Input 
                  id="edit_probability" 
                  name="probability" 
                  type="number" 
                  min="0" 
                  max="100"
                  defaultValue={deal.probability}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_stage_id">Stage</Label>
                <Select name="stage_id" defaultValue={deal.stage_id || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_contact_id">Contact</Label>
                <Select name="contact_id" defaultValue={deal.contact_id || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.first_name} {contact.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_expected_close_date">Expected Close Date</Label>
              <Input 
                id="edit_expected_close_date" 
                name="expected_close_date" 
                type="date"
                defaultValue={deal.expected_close_date || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_notes">Notes</Label>
              <Textarea 
                id="edit_notes" 
                name="notes" 
                rows={3}
                defaultValue={deal.notes || ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

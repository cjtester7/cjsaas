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
import { updateContact } from "@/app/actions/contacts"
import type { Contact } from "@/lib/types"

interface EditContactDialogProps {
  contact: Contact
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditContactDialog({ contact, open, onOpenChange }: EditContactDialogProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string || null,
      email: formData.get("email") as string || null,
      phone: formData.get("phone") as string || null,
      company: formData.get("company") as string || null,
      job_title: formData.get("job_title") as string || null,
      source: formData.get("source") as string || "manual",
      notes: formData.get("notes") as string || null,
    }

    await updateContact(contact.id, data)
    setLoading(false)
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update contact information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_first_name">First Name *</Label>
                <Input 
                  id="edit_first_name" 
                  name="first_name" 
                  defaultValue={contact.first_name}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_last_name">Last Name</Label>
                <Input 
                  id="edit_last_name" 
                  name="last_name"
                  defaultValue={contact.last_name || ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_email">Email</Label>
                <Input 
                  id="edit_email" 
                  name="email" 
                  type="email"
                  defaultValue={contact.email || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_phone">Phone</Label>
                <Input 
                  id="edit_phone" 
                  name="phone" 
                  type="tel"
                  defaultValue={contact.phone || ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_company">Company</Label>
                <Input 
                  id="edit_company" 
                  name="company"
                  defaultValue={contact.company || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_job_title">Job Title</Label>
                <Input 
                  id="edit_job_title" 
                  name="job_title"
                  defaultValue={contact.job_title || ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_source">Source</Label>
              <Select name="source" defaultValue={contact.source}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                  <SelectItem value="website">Website Form</SelectItem>
                  <SelectItem value="chatbot">Chatbot</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_notes">Notes</Label>
              <Textarea 
                id="edit_notes" 
                name="notes" 
                rows={3}
                defaultValue={contact.notes || ""}
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

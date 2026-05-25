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
import { updateAppointment } from "@/app/actions/appointments"
import type { Appointment, Contact } from "@/lib/types"
import { format } from "date-fns"

interface EditAppointmentDialogProps {
  appointment: Appointment
  contacts: Pick<Contact, "id" | "first_name" | "last_name">[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditAppointmentDialog({ appointment, contacts, open, onOpenChange }: EditAppointmentDialogProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const startDate = format(new Date(appointment.start_time), "yyyy-MM-dd")
  const startTime = format(new Date(appointment.start_time), "HH:mm")
  const endTime = format(new Date(appointment.end_time), "HH:mm")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const newStartDate = formData.get("start_date") as string
    const newStartTime = formData.get("start_time") as string
    const newEndTime = formData.get("end_time") as string

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      contact_id: formData.get("contact_id") as string || null,
      start_time: `${newStartDate}T${newStartTime}:00`,
      end_time: `${newStartDate}T${newEndTime}:00`,
      location: formData.get("location") as string || null,
      status: formData.get("status") as string,
    }

    await updateAppointment(appointment.id, data)
    setLoading(false)
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              Update appointment details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit_title">Title *</Label>
              <Input 
                id="edit_title" 
                name="title" 
                required 
                defaultValue={appointment.title}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_contact_id">Contact</Label>
                <Select name="contact_id" defaultValue={appointment.contact_id || undefined}>
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
              <div className="space-y-2">
                <Label htmlFor="edit_status">Status</Label>
                <Select name="status" defaultValue={appointment.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_start_date">Date *</Label>
              <Input 
                id="edit_start_date" 
                name="start_date" 
                type="date" 
                required
                defaultValue={startDate}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_start_time">Start Time *</Label>
                <Input 
                  id="edit_start_time" 
                  name="start_time" 
                  type="time" 
                  required
                  defaultValue={startTime}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_end_time">End Time *</Label>
                <Input 
                  id="edit_end_time" 
                  name="end_time" 
                  type="time" 
                  required
                  defaultValue={endTime}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_location">Location</Label>
              <Input 
                id="edit_location" 
                name="location"
                defaultValue={appointment.location || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit_description">Description</Label>
              <Textarea 
                id="edit_description" 
                name="description" 
                rows={3}
                defaultValue={appointment.description || ""}
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

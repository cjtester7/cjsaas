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
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  MoreHorizontal,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday,
} from "date-fns"
import type { Appointment, Contact } from "@/lib/types"
import { deleteAppointment } from "@/app/actions/appointments"
import { EditAppointmentDialog } from "./edit-appointment-dialog"
import { cn } from "@/lib/utils"

interface AppointmentsCalendarProps {
  appointments: (Appointment & { contact: Pick<Contact, "id" | "first_name" | "last_name"> | null })[]
  contacts: Pick<Contact, "id" | "first_name" | "last_name">[]
}

export function AppointmentsCalendar({ appointments, contacts }: AppointmentsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null)
  const router = useRouter()

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter((apt) => isSameDay(new Date(apt.start_time), date))
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      await deleteAppointment(id)
      router.refresh()
    }
  }

  const upcomingAppointments = appointments
    .filter((apt) => new Date(apt.start_time) >= new Date())
    .slice(0, 10)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>{format(currentDate, "MMMM yyyy")}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="bg-background p-2 text-center text-xs font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
            {days.map((day) => {
              const dayAppointments = getAppointmentsForDay(day)
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "bg-background p-2 min-h-[80px]",
                    !isSameMonth(day, currentDate) && "text-muted-foreground bg-muted/50"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isToday(day) && "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  <div className="mt-1 space-y-1">
                    {dayAppointments.slice(0, 2).map((apt) => (
                      <div
                        key={apt.id}
                        className="rounded bg-primary/10 px-1 py-0.5 text-xs truncate cursor-pointer hover:bg-primary/20"
                        title={apt.title}
                      >
                        {format(new Date(apt.start_time), "h:mm a")} {apt.title}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No upcoming appointments.
            </p>
          ) : (
            upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium truncate">{apt.title}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditAppointment(apt)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(apt.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {apt.contact && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {apt.contact.first_name} {apt.contact.last_name}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(apt.start_time), "MMM d, h:mm a")}
                    </span>
                    {apt.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {apt.location}
                      </span>
                    )}
                  </div>
                  <Badge 
                    variant={apt.status === "completed" ? "default" : "secondary"} 
                    className="mt-2 text-xs capitalize"
                  >
                    {apt.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {editAppointment && (
        <EditAppointmentDialog
          appointment={editAppointment}
          contacts={contacts}
          open={!!editAppointment}
          onOpenChange={(open) => !open && setEditAppointment(null)}
        />
      )}
    </div>
  )
}

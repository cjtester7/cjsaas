import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import type { Appointment } from "@/lib/types"

export async function UpcomingAppointments() {
  const supabase = await createClient()
  
  const now = new Date()
  
  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, contact:contacts(first_name, last_name)")
    .gte("start_time", now.toISOString())
    .order("start_time", { ascending: true })
    .limit(5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Appointments</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/appointments">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {(!appointments || appointments.length === 0) ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No upcoming appointments scheduled.
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment: Appointment & { contact: { first_name: string; last_name: string | null } | null }) => (
              <div key={appointment.id} className="flex items-start gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{appointment.title}</p>
                  {appointment.contact && (
                    <p className="text-xs text-muted-foreground">
                      with {appointment.contact.first_name} {appointment.contact.last_name}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(appointment.start_time), "MMM d, h:mm a")}
                    </span>
                    {appointment.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {appointment.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

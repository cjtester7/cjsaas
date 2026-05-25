import { createClient } from "@/lib/supabase/server"
import { AppointmentsCalendar } from "@/components/dashboard/appointments-calendar"
import { AddAppointmentDialog } from "@/components/dashboard/add-appointment-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function AppointmentsPage() {
  const supabase = await createClient()

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, contact:contacts(id, first_name, last_name)")
    .order("start_time", { ascending: true })

  const { data: contacts } = await supabase
    .from("contacts")
    .select("id, first_name, last_name")
    .order("first_name", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage your meetings.
          </p>
        </div>
        <AddAppointmentDialog contacts={contacts || []}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
        </AddAppointmentDialog>
      </div>

      <AppointmentsCalendar 
        appointments={appointments || []} 
        contacts={contacts || []}
      />
    </div>
  )
}

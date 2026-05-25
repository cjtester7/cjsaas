import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  FileText,
  UserPlus,
  DollarSign,
} from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import type { Activity } from "@/lib/types"

const activityIcons: Record<string, typeof Phone> = {
  call: Phone,
  email: Mail,
  message: MessageSquare,
  meeting: Calendar,
  note: FileText,
  contact_created: UserPlus,
  deal_created: DollarSign,
}

export default async function ActivitiesPage() {
  const supabase = await createClient()

  const { data: activities } = await supabase
    .from("activities")
    .select("*, contact:contacts(first_name, last_name)")
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity Timeline</h1>
        <p className="text-muted-foreground">
          Track all interactions and events across your CRM.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {(!activities || activities.length === 0) ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No activity recorded yet. Activities will appear here as you add contacts, create deals, and schedule appointments.
            </p>
          ) : (
            <div className="space-y-6">
              {activities.map((activity: Activity & { contact: { first_name: string; last_name: string | null } | null }) => {
                const Icon = activityIcons[activity.type] || FileText
                return (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        {activity.contact && (
                          <span>
                            {activity.contact.first_name} {activity.contact.last_name}
                          </span>
                        )}
                        <span>{format(new Date(activity.created_at), "MMM d, yyyy 'at' h:mm a")}</span>
                        <span className="capitalize">{activity.type.replace("_", " ")}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

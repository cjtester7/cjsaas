import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  FileText,
  UserPlus,
  DollarSign,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
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

export async function RecentActivity() {
  const supabase = await createClient()
  
  const { data: activities } = await supabase
    .from("activities")
    .select("*, contact:contacts(first_name, last_name)")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/activities">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {(!activities || activities.length === 0) ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No activity recorded yet. Start by adding contacts or deals.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity: Activity & { contact: { first_name: string; last_name: string | null } | null }) => {
              const Icon = activityIcons[activity.type] || FileText
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.title}</p>
                    {activity.contact && (
                      <p className="text-xs text-muted-foreground">
                        {activity.contact.first_name} {activity.contact.last_name}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

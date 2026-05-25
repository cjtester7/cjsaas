import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { RecentContacts } from "@/components/dashboard/recent-contacts"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { RecentActivity } from "@/components/dashboard/recent-activity"

async function getDashboardStats() {
  const supabase = await createClient()
  
  // Get total contacts
  const { count: totalContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })

  // Get contacts created this month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  
  const { count: newContactsThisMonth } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOfMonth.toISOString())

  // Get deals stats
  const { data: deals } = await supabase
    .from("deals")
    .select("value, stage:pipeline_stages(name)")

  const totalDealValue = deals?.reduce((sum, d) => sum + Number(d.value || 0), 0) || 0
  const wonDeals = deals?.filter((d) => d.stage?.name === "Won") || []
  const wonDealsValue = wonDeals.reduce((sum, d) => sum + Number(d.value || 0), 0)
  const openDeals = deals?.filter((d) => d.stage?.name !== "Won" && d.stage?.name !== "Lost").length || 0

  // Get appointments this week
  const now = new Date()
  const endOfWeek = new Date(now)
  endOfWeek.setDate(now.getDate() + 7)
  
  const { count: appointmentsThisWeek } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .gte("start_time", now.toISOString())
    .lte("start_time", endOfWeek.toISOString())

  return {
    totalContacts: totalContacts || 0,
    newContactsThisMonth: newContactsThisMonth || 0,
    totalDeals: deals?.length || 0,
    totalDealValue,
    openDeals,
    wonDealsValue,
    appointmentsThisWeek: appointmentsThisWeek || 0,
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your CRM.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                {stats.newContactsThisMonth}
              </span>
              {" "}new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalDealValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.openDeals} open deals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Won Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.wonDealsValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From closed deals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointmentsThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentContacts />
        <UpcomingAppointments />
      </div>

      <RecentActivity />
    </div>
  )
}

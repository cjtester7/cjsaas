import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react"
import { format, subDays, startOfMonth, endOfMonth } from "date-fns"

async function getReportData() {
  const supabase = await createClient()
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)
  const last30Days = subDays(now, 30)

  // Contacts by source
  const { data: contacts } = await supabase
    .from("contacts")
    .select("source")

  const contactsBySource: Record<string, number> = {}
  contacts?.forEach((c) => {
    contactsBySource[c.source] = (contactsBySource[c.source] || 0) + 1
  })

  // Deals by stage
  const { data: deals } = await supabase
    .from("deals")
    .select("value, stage:pipeline_stages(name, color)")

  const dealsByStage: Record<string, { count: number; value: number; color: string }> = {}
  deals?.forEach((d) => {
    const stageName = d.stage?.name || "Unknown"
    if (!dealsByStage[stageName]) {
      dealsByStage[stageName] = { count: 0, value: 0, color: d.stage?.color || "#6B7280" }
    }
    dealsByStage[stageName].count++
    dealsByStage[stageName].value += Number(d.value || 0)
  })

  // Monthly contacts
  const { count: monthlyContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .gte("created_at", monthStart.toISOString())
    .lte("created_at", monthEnd.toISOString())

  // Monthly deals
  const { data: monthlyDeals } = await supabase
    .from("deals")
    .select("value")
    .gte("created_at", monthStart.toISOString())
    .lte("created_at", monthEnd.toISOString())

  const monthlyDealValue = monthlyDeals?.reduce((sum, d) => sum + Number(d.value || 0), 0) || 0

  // Appointments this month
  const { count: monthlyAppointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .gte("start_time", monthStart.toISOString())
    .lte("start_time", monthEnd.toISOString())

  // Won deals
  const { data: wonDeals } = await supabase
    .from("deals")
    .select("value, stage:pipeline_stages(name)")
    .eq("stage.name", "Won")

  const wonValue = wonDeals?.reduce((sum, d) => sum + Number(d.value || 0), 0) || 0
  const totalValue = deals?.reduce((sum, d) => sum + Number(d.value || 0), 0) || 0
  const conversionRate = totalValue > 0 ? ((wonValue / totalValue) * 100).toFixed(1) : 0

  return {
    contactsBySource,
    dealsByStage,
    monthlyContacts: monthlyContacts || 0,
    monthlyDeals: monthlyDeals?.length || 0,
    monthlyDealValue,
    monthlyAppointments: monthlyAppointments || 0,
    conversionRate,
    totalContacts: contacts?.length || 0,
    totalDeals: deals?.length || 0,
    totalDealValue: totalValue,
  }
}

export default async function ReportsPage() {
  const data = await getReportData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Analytics and insights for your CRM.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.monthlyContacts}</div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month Deals</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.monthlyDeals}</div>
            <p className="text-xs text-muted-foreground">
              ${data.monthlyDealValue.toLocaleString()} total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.monthlyAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled meetings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Won deals / Total deals value
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contacts by Source */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Contacts by Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(data.contactsBySource).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No contacts yet.
              </p>
            ) : (
              <div className="space-y-4">
                {Object.entries(data.contactsBySource).map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-sm capitalize">{source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{count}</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / data.totalContacts) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Deals by Stage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Deals by Pipeline Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(data.dealsByStage).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No deals yet.
              </p>
            ) : (
              <div className="space-y-4">
                {Object.entries(data.dealsByStage).map(([stage, { count, value, color }]) => (
                  <div key={stage} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ backgroundColor: color }}
                        />
                        <span>{stage}</span>
                      </div>
                      <span className="font-medium">
                        {count} deals - ${value.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: color,
                          width: `${data.totalDealValue > 0 ? (value / data.totalDealValue) * 100 : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

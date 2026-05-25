import { createClient } from "@/lib/supabase/server"
import { PipelineBoard } from "@/components/dashboard/pipeline-board"
import { AddDealDialog } from "@/components/dashboard/add-deal-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function PipelinePage() {
  const supabase = await createClient()

  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("*")
    .order("position", { ascending: true })

  const { data: deals } = await supabase
    .from("deals")
    .select("*, contact:contacts(id, first_name, last_name, email)")
    .order("created_at", { ascending: false })

  const { data: contacts } = await supabase
    .from("contacts")
    .select("id, first_name, last_name")
    .order("first_name", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground">
            Track your deals through the sales process.
          </p>
        </div>
        <AddDealDialog stages={stages || []} contacts={contacts || []}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Deal
          </Button>
        </AddDealDialog>
      </div>

      <PipelineBoard 
        stages={stages || []} 
        deals={deals || []} 
        contacts={contacts || []}
      />
    </div>
  )
}

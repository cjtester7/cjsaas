import { createClient } from "@/lib/supabase/server"
import { ContactsTable } from "@/components/dashboard/contacts-table"
import { AddContactDialog } from "@/components/dashboard/add-contact-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function ContactsPage() {
  const supabase = await createClient()
  
  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your leads and customers.
          </p>
        </div>
        <AddContactDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </AddContactDialog>
      </div>

      <ContactsTable contacts={contacts || []} />
    </div>
  )
}

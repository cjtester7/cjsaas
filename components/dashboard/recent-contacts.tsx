import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Contact } from "@/lib/types"

export async function RecentContacts() {
  const supabase = await createClient()
  
  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Contacts</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/contacts">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {(!contacts || contacts.length === 0) ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No contacts yet. Add your first contact to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact: Contact) => (
              <div key={contact.id} className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {contact.first_name[0]}
                    {contact.last_name?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {contact.first_name} {contact.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {contact.email || contact.phone || contact.company || "No contact info"}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground capitalize">
                  {contact.source}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, User, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function ConversationsPage() {
  const supabase = await createClient()

  const { data: conversations } = await supabase
    .from("chat_conversations")
    .select(`
      *,
      contact:contacts(first_name, last_name, email),
      messages:chat_messages(id, role, content, created_at)
    `)
    .order("updated_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conversations</h1>
        <p className="text-muted-foreground">
          View chatbot conversations with your leads.
        </p>
      </div>

      {(!conversations || conversations.length === 0) ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground">
              Chatbot conversations from your landing page will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {conversations.map((conversation) => {
            const lastMessage = conversation.messages?.[conversation.messages.length - 1]
            return (
              <Card key={conversation.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conversation.contact ? (
                            <>
                              {conversation.contact.first_name[0]}
                              {conversation.contact.last_name?.[0] || ""}
                            </>
                          ) : (
                            <User className="h-5 w-5" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {conversation.contact 
                            ? `${conversation.contact.first_name} ${conversation.contact.last_name || ""}`
                            : "Anonymous Visitor"
                          }
                        </CardTitle>
                        {conversation.contact?.email && (
                          <p className="text-sm text-muted-foreground">
                            {conversation.contact.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={conversation.status === "active" ? "default" : "secondary"}>
                        {conversation.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      {conversation.messages?.length || 0} messages
                    </div>
                    {lastMessage && (
                      <p className="text-sm text-muted-foreground truncate max-w-md">
                        Last: {lastMessage.content.substring(0, 50)}...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversation_id, contact_info } = body

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    let conversationId = conversation_id
    let contactId: string | null = null

    // If contact info provided, create or find contact
    if (contact_info?.email) {
      const { data: existingContact } = await supabase
        .from("contacts")
        .select("id")
        .eq("email", contact_info.email)
        .single()

      if (existingContact) {
        contactId = existingContact.id
      } else {
        const { data: newContact } = await supabase
          .from("contacts")
          .insert({
            first_name: contact_info.first_name || "Website",
            last_name: contact_info.last_name || "Visitor",
            email: contact_info.email,
            phone: contact_info.phone,
            source: "chatbot",
          })
          .select()
          .single()

        if (newContact) {
          contactId = newContact.id

          // Create activity
          await supabase.from("activities").insert({
            type: "contact_created",
            title: `New lead from chatbot: ${contact_info.first_name || "Visitor"}`,
            contact_id: contactId,
          })
        }
      }
    }

    // Create or get conversation
    if (!conversationId) {
      const { data: newConversation } = await supabase
        .from("chat_conversations")
        .insert({
          contact_id: contactId,
          status: "active",
          metadata: { source: "website_chatbot" },
        })
        .select()
        .single()

      conversationId = newConversation?.id
    } else if (contactId) {
      // Update conversation with contact
      await supabase
        .from("chat_conversations")
        .update({ contact_id: contactId })
        .eq("id", conversationId)
    }

    // Store user message
    await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      role: "user",
      content: message,
    })

    // Generate AI response (simple rule-based for now)
    const aiResponse = generateResponse(message, contact_info)

    // Store AI response
    await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      role: "assistant",
      content: aiResponse.message,
    })

    // Update conversation timestamp
    await supabase
      .from("chat_conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId)

    return NextResponse.json({
      success: true,
      conversation_id: conversationId,
      response: aiResponse.message,
      collect_info: aiResponse.collectInfo,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    )
  }
}

function generateResponse(message: string, contactInfo?: { email?: string }) {
  const lowerMessage = message.toLowerCase()

  // If no contact info yet, try to collect it
  if (!contactInfo?.email) {
    if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("price")) {
      return {
        message: "Great question! Our pricing varies based on your specific needs. To give you an accurate quote, I'd love to learn more about your business. Could you share your email so we can send you detailed pricing information?",
        collectInfo: true,
      }
    }

    if (lowerMessage.includes("demo") || lowerMessage.includes("trial") || lowerMessage.includes("try")) {
      return {
        message: "I'd be happy to set up a demo for you! Our AI automation solutions can transform how you handle customer interactions. To schedule your personalized demo, could you share your email address?",
        collectInfo: true,
      }
    }

    if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("help")) {
      return {
        message: "We offer AI-powered voice agents, conversational chatbots, automated follow-up systems, and appointment booking solutions - all designed to help local businesses capture more leads and convert them into customers. Would you like to learn how these could work for your business? Just share your email and we'll send you more details!",
        collectInfo: true,
      }
    }

    // Default greeting
    return {
      message: "Hi there! I'm here to help you learn about our AI automation solutions for local businesses. We help with voice agents, chatbots, automated follow-ups, and appointment booking. What would you like to know more about?",
      collectInfo: false,
    }
  }

  // Already have contact info
  return {
    message: "Thanks for your interest! One of our team members will reach out to you shortly at your email address. In the meantime, feel free to ask any other questions about our AI automation services!",
    collectInfo: false,
  }
}

import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      company, 
      message,
      form_type = "contact",
      source = "website"
    } = body

    if (!first_name || !email) {
      return NextResponse.json(
        { error: "First name and email are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if contact already exists
    const { data: existingContact } = await supabase
      .from("contacts")
      .select("id")
      .eq("email", email)
      .single()

    let contactId: string

    if (existingContact) {
      // Update existing contact
      contactId = existingContact.id
      await supabase
        .from("contacts")
        .update({
          first_name,
          last_name,
          phone,
          company,
        })
        .eq("id", contactId)
    } else {
      // Create new contact
      const { data: newContact, error: contactError } = await supabase
        .from("contacts")
        .insert({
          first_name,
          last_name,
          email,
          phone,
          company,
          source,
          notes: message,
        })
        .select()
        .single()

      if (contactError) {
        throw new Error(contactError.message)
      }

      contactId = newContact.id

      // Create activity for new contact
      await supabase.from("activities").insert({
        type: "contact_created",
        title: `New lead from ${source}: ${first_name} ${last_name || ""}`.trim(),
        contact_id: contactId,
      })
    }

    // Store form submission
    const { error: submissionError } = await supabase
      .from("form_submissions")
      .insert({
        form_type,
        data: { first_name, last_name, email, phone, company, message },
        contact_id: contactId,
        source_url: request.headers.get("referer") || null,
      })

    if (submissionError) {
      throw new Error(submissionError.message)
    }

    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully",
      contact_id: contactId 
    })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    )
  }
}

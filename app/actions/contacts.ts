"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createContact(data: {
  first_name: string
  last_name?: string | null
  email?: string | null
  phone?: string | null
  company?: string | null
  job_title?: string | null
  source?: string
  notes?: string | null
}) {
  const supabase = await createClient()

  const { data: contact, error } = await supabase
    .from("contacts")
    .insert(data)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Create activity for new contact
  await supabase.from("activities").insert({
    type: "contact_created",
    title: `Created contact: ${data.first_name} ${data.last_name || ""}`.trim(),
    contact_id: contact.id,
  })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/contacts")

  return contact
}

export async function updateContact(id: string, data: {
  first_name?: string
  last_name?: string | null
  email?: string | null
  phone?: string | null
  company?: string | null
  job_title?: string | null
  source?: string
  notes?: string | null
}) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("contacts")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/contacts")
}

export async function deleteContact(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/contacts")
}

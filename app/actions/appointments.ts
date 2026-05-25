"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createAppointment(data: {
  title: string
  description?: string | null
  contact_id?: string | null
  start_time: string
  end_time: string
  location?: string | null
  status?: string
}) {
  const supabase = await createClient()

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert(data)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Create activity for new appointment
  await supabase.from("activities").insert({
    type: "meeting",
    title: `Scheduled appointment: ${data.title}`,
    contact_id: data.contact_id,
  })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/appointments")

  return appointment
}

export async function updateAppointment(id: string, data: {
  title?: string
  description?: string | null
  contact_id?: string | null
  start_time?: string
  end_time?: string
  location?: string | null
  status?: string
}) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("appointments")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/appointments")
}

export async function deleteAppointment(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/appointments")
}

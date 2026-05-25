"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createDeal(data: {
  title: string
  value?: number
  contact_id?: string | null
  stage_id?: string | null
  expected_close_date?: string | null
  probability?: number
  notes?: string | null
}) {
  const supabase = await createClient()

  const { data: deal, error } = await supabase
    .from("deals")
    .insert(data)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Create activity for new deal
  await supabase.from("activities").insert({
    type: "deal_created",
    title: `Created deal: ${data.title}`,
    contact_id: data.contact_id,
    deal_id: deal.id,
  })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/pipeline")

  return deal
}

export async function updateDeal(id: string, data: {
  title?: string
  value?: number
  contact_id?: string | null
  stage_id?: string | null
  expected_close_date?: string | null
  probability?: number
  notes?: string | null
}) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("deals")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/pipeline")
}

export async function deleteDeal(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("deals")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/pipeline")
}

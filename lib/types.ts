// CRM Types

export interface Contact {
  id: string
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
  company: string | null
  job_title: string | null
  source: string
  tags: string[]
  notes: string | null
  created_at: string
  updated_at: string
}

export interface PipelineStage {
  id: string
  name: string
  position: number
  color: string
  created_at: string
}

export interface Deal {
  id: string
  title: string
  value: number
  contact_id: string | null
  stage_id: string | null
  expected_close_date: string | null
  probability: number
  notes: string | null
  created_at: string
  updated_at: string
  contact?: Contact | null
  stage?: PipelineStage | null
}

export interface Appointment {
  id: string
  title: string
  description: string | null
  contact_id: string | null
  deal_id: string | null
  start_time: string
  end_time: string
  location: string | null
  status: string
  created_at: string
  updated_at: string
  contact?: Contact | null
}

export interface Activity {
  id: string
  type: string
  title: string
  description: string | null
  contact_id: string | null
  deal_id: string | null
  metadata: Record<string, unknown>
  created_at: string
  contact?: Contact | null
}

export interface FormSubmission {
  id: string
  form_type: string
  data: Record<string, unknown>
  contact_id: string | null
  source_url: string | null
  created_at: string
}

export interface ChatConversation {
  id: string
  contact_id: string | null
  status: string
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
  contact?: Contact | null
}

export interface ChatMessage {
  id: string
  conversation_id: string
  role: string
  content: string
  created_at: string
}

// Dashboard stats
export interface DashboardStats {
  totalContacts: number
  newContactsThisMonth: number
  totalDeals: number
  totalDealValue: number
  openDeals: number
  wonDealsValue: number
  appointmentsThisWeek: number
  conversionRate: number
}

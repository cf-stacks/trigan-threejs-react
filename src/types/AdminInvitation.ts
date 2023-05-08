export interface AdminInvitation {
  id: string
  creator_id: string
  created_at: string
  updated_at: string
  email: string
  role_id: number
  token: string
  expired_at: string
}

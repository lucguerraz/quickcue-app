export interface Comment {
  uuid: string
  message: string
  timestamp_start: number
  timestamp_end: number
  updated_at: string
  user: { uuid: string; name: string; picture: string | null }
}

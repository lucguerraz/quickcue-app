export interface Comment {
  uuid: string
  message: string
  timestamp_start: number
  timestamp_end: number
  updated_at: string
  user: { uuid: string; name: string; picture: string | null }
}

export interface GetCommentsSuccess {
  success: boolean
  message: string
  commentsData: Comment[]
}

export interface GetCommentsError {
  success: boolean
  message: string
  errors: GetCommentsErrorErrors
  httpcode: number
}

export interface GetCommentsErrorErrors {
  [key: string]: string[]
}

export type GetCommentsResponse = GetCommentsSuccess | GetCommentsError

export const getComments = async (videoUUID: string): Promise<GetCommentsResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/videos/${videoUUID}/comments`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    if (response.ok) {
      const commentsData = await response.json()
      return {
        success: true,
        message: 'Success',
        commentsData,
      }
    } else {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.error,
        errors: errorData?.errors || {},
        httpcode: response.status,
      }
    }
  } catch (error) {
    console.error('Comments fetch error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
      httpcode: 500,
    }
  }
}

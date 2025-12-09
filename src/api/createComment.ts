import { type Comment } from '@/api/getComments'

export interface CreateCommentSuccess {
  success: boolean
  message: string
  commentData: Comment
}

export interface CreateCommentError {
  success: boolean
  message: string
  errors: CreateCommentErrorErrors
}

export interface CreateCommentErrorErrors {
  [key: string]: string[]
}

export type CreateCommentResponse = CreateCommentSuccess | CreateCommentError

export const createComment = async (
  videoUUID: string,
  message: string,
  timestamp_start: number,
  timestamp_end: number,
): Promise<CreateCommentResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/videos/${videoUUID}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ message, timestamp_start, timestamp_end }),
    })

    if (response.ok) {
      const commentData = await response.json()
      return {
        success: true,
        message: 'Success',
        commentData,
      }
    } else {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.error || 'Invalid input',
        errors: errorData?.errors || {},
      }
    }
  } catch (error) {
    console.error('Create Comment Error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

export interface DeleteVideoSuccess {
  success: boolean
  message: string
}

export interface DeleteVideoError {
  success: boolean
  message: string
  errors: DeleteVideoErrorErrors
}

export interface DeleteVideoErrorErrors {
  [key: string]: string[]
}

export type DeleteVideoResponse = DeleteVideoSuccess | DeleteVideoError

export const deleteVideo = async (uuid: string): Promise<DeleteVideoResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/videos/${uuid}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    if (response.ok) {
      return {
        success: true,
        message: 'Success',
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
    console.error('Delete Video Error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

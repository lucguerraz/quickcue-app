export interface DeleteSessionSuccess {
  success: boolean
  message: string
}

export interface DeleteSessionError {
  success: boolean
  message: string
  errors: DeleteSessionErrorErrors
}

export interface DeleteSessionErrorErrors {
  [key: string]: string[]
}

export type DeleteSessionResponse = DeleteSessionSuccess | DeleteSessionError

export const deleteSession = async (sessionUUID: string): Promise<DeleteSessionResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${sessionUUID}`, {
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
        message: errorData.error,
        errors: errorData?.errors || {},
      }
    }
  } catch (error) {
    console.error('Update Session error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

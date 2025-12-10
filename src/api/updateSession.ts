export interface UpdateSessionSuccess {
  success: boolean
  message: string
  userData: {
    uuid: string
    name: string
    email_address: string
    picture: string | null
  }
}

export interface UpdateSessionError {
  success: boolean
  message: string
  errors: UpdateSessionErrorErrors
}

export interface UpdateSessionErrorErrors {
  [key: string]: string[]
}

export type UpdateSessionResponse = UpdateSessionSuccess | UpdateSessionError

export const updateSession = async (sessionUUID: string, code: string): Promise<UpdateSessionResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${sessionUUID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      credentials: 'include',
    })

    if (response.ok) {
      const userData = await response.json()
      return {
        success: true,
        message: 'Success',
        userData,
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

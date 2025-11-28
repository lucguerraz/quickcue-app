export interface CreateSessionSuccess {
  success: boolean
  message: string
  sessionData: {
    uuid: string
  }
}

export interface CreateSessionError {
  success: boolean
  message: string
  errors: CreateSessionErrorErrors
}

export interface CreateSessionErrorErrors {
  [key: string]: string[]
}

export type CreateSessionResponse = CreateSessionSuccess | CreateSessionError

export const createSession = async (email_address: string): Promise<CreateSessionResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address }),
    })

    if (response.ok) {
      const sessionData = await response.json()
      return {
        success: true,
        message: 'Success',
        sessionData,
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
    console.error('Create Session Error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

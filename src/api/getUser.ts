export interface GetUserSuccess {
  success: boolean
  message: string
  userData: {
    uuid: string
    name: string | null
    email_address: string
    picture: string | null
  }
}

export interface GetUserError {
  success: boolean
  message: string
  errors: GetUserErrorErrors
}

export interface GetUserErrorErrors {
  [key: string]: string[]
}

export type GetUserResponse = GetUserSuccess | GetUserError

export const getUser = async (): Promise<GetUserResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/me`, {
      headers: { 'Content-Type': 'application/json' },
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
    console.error('User fetch error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

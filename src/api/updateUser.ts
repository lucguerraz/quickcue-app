export interface UpdateUserSuccess {
  success: boolean
  message: string
  userData: {
    uuid: string
    name: string
    email_address: string
  }
}

export interface UpdateUserError {
  success: boolean
  message: string
  errors: UpdateUserErrorErrors
}

export interface UpdateUserErrorErrors {
  [key: string]: string[]
}

export type UpdateUserResponse = UpdateUserSuccess | UpdateUserError

export const updateUser = async (email_address: string, name: string): Promise<UpdateUserResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email_address, name }),
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
        message: errorData.error || 'Invalid input',
        errors: errorData?.errors || {},
      }
    }
  } catch (error) {
    console.error('Update User Error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

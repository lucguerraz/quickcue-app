export interface DeleteUserSuccess {
  success: boolean
  message: string
}

export interface DeleteUserError {
  success: boolean
  message: string
  errors: DeleteUserErrorErrors
}

export interface DeleteUserErrorErrors {
  [key: string]: string[]
}

export type DeleteUserResponse = DeleteUserSuccess | DeleteUserError

export const deleteUser = async (): Promise<DeleteUserResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/me`, {
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
    console.error('Delete User Error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

export interface UpdateVideoSuccess {
  success: boolean
  message: string
  videoData: {
    uuid: string
    name: string
    email_address: string
  }
}

export interface UpdateVideoError {
  success: boolean
  message: string
  errors: UpdateVideoErrorErrors
}

export interface UpdateVideoErrorErrors {
  [key: string]: string[]
}

export type UpdateVideoResponse = UpdateVideoSuccess | UpdateVideoError

export const updateVideo = async (uuid: string, name: string): Promise<UpdateVideoResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/videos/${uuid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ video: { name } }),
    })

    if (response.ok) {
      const videoData = await response.json()
      return {
        success: true,
        message: 'Success',
        videoData,
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

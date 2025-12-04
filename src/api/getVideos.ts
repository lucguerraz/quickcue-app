export interface Video {
  uuid: string
  name: string
  resolution: string
  duration: number
  framespersecond: number
  codec: string
  bitrate: number
  size: number
  updated_at: string
  poster: string
  comment_count: number
}

export interface GetVideosSuccess {
  success: boolean
  message: string
  videosData: Video[]
}

export interface GetVideosError {
  success: boolean
  message: string
  errors: GetVideosErrorErrors
}

export interface GetVideosErrorErrors {
  [key: string]: string[]
}

export type GetVideosResponse = GetVideosSuccess | GetVideosError

export const getVideos = async (): Promise<GetVideosResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/videos`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    if (response.ok) {
      const videosData = await response.json()
      return {
        success: true,
        message: 'Success',
        videosData,
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
    console.error('Videos fetch error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

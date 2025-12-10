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
  video_url: string
  user: { uuid: string; name: string | null }
}

export interface GetVideoSuccess {
  success: boolean
  message: string
  videoData: Video
}

export interface GetVideoError {
  success: boolean
  message: string
  errors: GetVideoErrorErrors
}

export interface GetVideoErrorErrors {
  [key: string]: string[]
}

export type GetVideoResponse = GetVideoSuccess | GetVideoError

export const getVideo = async (videoUUID: string): Promise<GetVideoResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/videos/${videoUUID}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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
        message: errorData.error,
        errors: errorData?.errors || {},
      }
    }
  } catch (error) {
    console.error('Video fetch error:', error)
    return {
      success: false,
      message: 'Network error',
      errors: {},
    }
  }
}

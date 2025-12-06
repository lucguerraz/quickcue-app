import React, { useState } from 'react'

import { Button } from '@/components/Core/Button'
import { useApp } from '@/context/App'
import { createVideo } from '@/api/createVideo'

export interface VideoUploadProps {
  uploadingVideo: any
  setUploadingVideo: (video: any) => void
  className?: string
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ setUploadingVideo, className = '' }) => {
  const [disabled, setDisabled] = useState(false)
  const {
    toast: { stack, setStack },
  } = useApp()

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDisabled(true)

    if (e.target.files === null) return

    const file = e.target.files[0]

    const api = await createVideo(file, setUploadingVideo, setDisabled)

    if (api.success) {
      const uuid = crypto.randomUUID()
      setStack({
        ...stack,
        [uuid]: {
          id: uuid,
          status: 'success',
          message: 'Video was uploaded',
          trigger: 'videoUpload',
        },
      })
      return
    }

    const uuid = crypto.randomUUID()
    setStack({
      ...stack,
      [uuid]: {
        id: uuid,
        status: 'error',
        message: "Sorry, couldn't upload video",
        detail: api.message,
        trigger: 'videoUpload',
      },
    })
  }

  return (
    <form className={`${className}`}>
      <label>
        <Button icon="new" onClick={() => document.getElementById('videoUpload')?.click()} disabled={disabled}>
          Upload Video
        </Button>
        <input
          id="videoUpload"
          type="file"
          accept="video/mp4,video/quicktime,video/webm,video/mpeg,video/h264,video/h265"
          name="file"
          onChange={handleSubmit}
          disabled={disabled}
          className="hidden"
        />
      </label>
    </form>
  )
}

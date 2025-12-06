import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { getVideos, type GetVideosSuccess, type Video } from '@/api/getVideos'
import { AlertCircle } from 'react-feather'
import { Button } from '@/components/Core/Button'
import { VideoTeaser, VideoTeaserSkeleton, VideoTeaserUploading } from '@/components/Dashboard/VideoTeaser'
import { type uploadPreview } from '@/api/createVideo'

export interface VideoCollectionProps {
  uploadingVideo: uploadPreview | null
  setUploadingVideo: (video: uploadPreview | null) => void
  className?: string
}

export const VideoCollection: React.FC<VideoCollectionProps> = ({
  uploadingVideo,
  setUploadingVideo,
  className = '',
}) => {
  const { isPending, data, isError, error, refetch } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const api = await getVideos()

      if (api.success) {
        return (api as GetVideosSuccess).videosData
      }

      throw new Error(api.message)
    },
  })

  if (isError) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-3">
        <p className="flex items-center gap-1 text-sm leading-none text-text-secondary-contrast">
          <AlertCircle height="1em" width="1em" />
          {error.message}
        </p>
        <h2 className="text-text-primar text-center text-3xl leading-tight font-medium">
          Sorry, your videos couldn't be loaded
        </h2>
        <Button variant="secondary" onClick={refetch}>
          Try Again
        </Button>
      </div>
    )
  }

  if (uploadingVideo && uploadingVideo.status === 'done') {
    ;(async () => {
      await refetch()
      setUploadingVideo(null)
    })()
  }

  return (
    <div className={`m-3 grid grid-cols-[repeat(auto-fill,minmax(min(400px,calc(100vw-3rem)),1fr))] ${className}`}>
      {uploadingVideo && (
        <VideoTeaserUploading
          key={uploadingVideo.uuid}
          uuid={uploadingVideo.uuid}
          title={uploadingVideo.name}
          poster={uploadingVideo.poster}
          status={uploadingVideo.status}
          progress={uploadingVideo.progress}
        />
      )}
      {isPending
        ? [...Array(8).keys()].map((key) => <VideoTeaserSkeleton key={key} />)
        : (data as Video[]).map((video) => (
            <VideoTeaser
              key={video.uuid}
              uuid={video.uuid}
              poster={video.poster}
              title={video.name}
              commentCount={video.comment_count}
              lastModified={video.updated_at}
            />
          ))}
    </div>
  )
}

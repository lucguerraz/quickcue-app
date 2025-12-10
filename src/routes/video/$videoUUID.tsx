import { useEffect, useState, useRef } from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { useAuth } from '@/context/Auth'
import { useApp } from '@/context/App'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'react-feather'
import { Button } from '@/components/Core/Button'
import { LinkButton } from '@/components/Core/LinkButton'
import { VideoPlayer } from '@/components/Video/VideoPlayer'
import { CommentSection } from '@/components/Video/Comments/CommentSection'
import { getVideo, type GetVideoSuccess } from '@/api/getVideo'
import { getComments, type GetCommentsSuccess } from '@/api/getComments'

export const Route = createFileRoute('/video/$videoUUID')({
  component: VideoPage,
})

function VideoPage() {
  const { videoUUID } = Route.useParams()
  const { isAuthenticated, user } = useAuth()
  const {
    header: { setShowDashboardButton },
  } = useApp()

  useEffect(() => {
    setShowDashboardButton(true)
  })

  const videoEventTarget = useRef(new EventTarget())
  const [videoLength, setVideoLength] = useState(0)
  const [videoTimecode, setVideoTimecode] = useState(0)

  const {
    isPending: videoIsPending,
    data: videoData,
    isError: videoIsError,
    error: videoError,
    refetch: videoRefetch,
  } = useQuery({
    queryKey: ['video', videoUUID],
    queryFn: async () => {
      const api = await getVideo(videoUUID)

      if (api.success) {
        return (api as GetVideoSuccess).videoData
      }

      throw new Error(api.message)
    },
  })
  const {
    isPending: commentsIsPending,
    data: commentsData,
    isError: commentsIsError,
    error: commentsError,
    refetch: commentsRefetch,
  } = useQuery({
    queryKey: ['comments', videoUUID],
    queryFn: async () => {
      const api = await getComments(videoUUID)

      if (api.success) {
        return (api as GetCommentsSuccess).commentsData
      }

      throw new Error(api.message)
    },
  })

  if (videoIsError || commentsIsError) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-3">
        <p className="flex items-center gap-1 text-sm leading-none text-text-secondary-contrast">
          <AlertCircle height="1em" width="1em" />
          {videoError?.message || commentsError?.message}
        </p>
        <h2 className="text-text-primar text-center text-3xl leading-tight font-medium">
          Sorry, the video couldn't be loaded
        </h2>
        <Button
          variant="secondary"
          onClick={() => {
            videoRefetch()
            commentsRefetch()
          }}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (videoIsPending || commentsIsPending) {
    return (
      <section>
        <div className="mx-6 flex items-center justify-between pt-6">
          <div className="h-9 w-2/5 min-w-120 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 w-28 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
            <div className="h-10 w-28 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
          </div>
        </div>
        <div className="m-6 grid grid-cols-[3fr_1fr] gap-3">
          <div className="aspect-video w-full rounded-lg bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
          <div className="flex flex-col gap-3">
            <div className="h-40 w-full rounded-md bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
            <div className="h-30 w-full rounded-md bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
            <div className="h-30 w-full rounded-md bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
            <div className="h-30 w-full rounded-md bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
            <div className="h-30 w-full rounded-md bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section>
        <div className="mx-6 flex items-center justify-between pt-6">
          <h1 className="text-4xl leading-none font-medium text-text-primary">{videoData.name}</h1>
          {isAuthenticated() && user?.uuid === videoData.user.uuid ? (
            <div className="flex gap-2">
              <LinkButton to="/video/$videoUUID/edit" params={{ videoUUID }} variant="secondary" icon="edit">
                Edit
              </LinkButton>
              <LinkButton to="/video/$videoUUID/share" params={{ videoUUID }} icon="share">
                Share
              </LinkButton>
            </div>
          ) : null}
        </div>
        <div className="m-6 grid grid-cols-[3fr_1fr] gap-3">
          <div>
            <VideoPlayer
              videoUrl={videoData.video_url}
              eventTarget={videoEventTarget.current}
              comments={commentsData}
              setVideoLength={setVideoLength}
              setVideoTimecode={setVideoTimecode}
            />
          </div>
          <CommentSection
            videoUUID={videoUUID}
            videoTimecode={videoTimecode}
            videoEventTarget={videoEventTarget.current}
            videoLength={videoLength}
            comments={commentsData}
            reload={commentsRefetch}
          />
        </div>
      </section>
      <Outlet />
    </>
  )
}

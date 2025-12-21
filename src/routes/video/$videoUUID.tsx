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
import { getVideo, type GetVideoSuccess, type GetVideoError } from '@/api/getVideo'
import { getComments, type GetCommentsSuccess, type GetCommentsError } from '@/api/getComments'

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

      throw new Error(api.message, { cause: (api as GetVideoError).httpcode })
    },
    retry: (count, error) => {
      if (error.cause) return false
      if (count > 5) return false
      return true
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

      throw new Error(api.message, { cause: (api as GetCommentsError).httpcode })
    },
    retry: (count, error) => {
      if (error.cause) return false
      if (count > 5) return false
      return true
    },
  })

  useEffect(() => {
    if (videoData?.name) {
      document.title = videoData.name + ' | QuickCue'
    }
  }, [videoIsPending])

  if (videoIsError || commentsIsError) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-3">
        <p className="flex items-center gap-1 text-sm leading-none text-text-secondary-contrast">
          <AlertCircle height="1em" width="1em" />
          {videoError?.message || commentsError?.message}
        </p>
        <h2 className="text-text-primar text-center text-3xl leading-tight font-medium">
          {videoError?.cause === 404 ? "Sorry, the video couldn't be found" : "Sorry, the video couldn't be loaded"}
        </h2>
        {videoError?.cause === 404 ? (
          <LinkButton variant="secondary" to="/">
            Return to Dashboard
          </LinkButton>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              videoRefetch()
              commentsRefetch()
            }}
          >
            Try Again
          </Button>
        )}
      </div>
    )
  }

  if (videoIsPending || commentsIsPending) {
    return (
      <section>
        <div className="mx-6 flex flex-col items-start justify-between gap-3 pt-6 md:flex-row md:items-center">
          <div className="h-9 w-full rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse md:w-2/5 md:min-w-120"></div>
          <div className="flex gap-2">
            <div className="h-10 w-28 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
            <div className="h-10 w-28 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
          </div>
        </div>
        <div className="m-6 grid grid-cols-1 gap-3 lg:grid-cols-[3fr_1fr]">
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
        <div className="mx-6 flex flex-row flex-wrap items-center justify-between gap-3 pt-6">
          <h1 className="text-4xl leading-none font-medium break-all text-text-primary">{videoData.name}</h1>
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
        <div className="m-6 grid grid-cols-1 gap-3 lg:grid-cols-[3fr_1fr]">
          <div>
            <VideoPlayer
              videoUrl={videoData.video_url}
              eventTarget={videoEventTarget.current}
              comments={commentsData}
              setVideoLength={setVideoLength}
              setVideoTimecode={setVideoTimecode}
              className="lg:sticky lg:top-6"
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

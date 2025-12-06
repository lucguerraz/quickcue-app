import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { useApp } from '@/context/App'

export const Route = createFileRoute('/video/$videoUUID')({
  component: VideoPage,
})

function VideoPage() {
  const { videoUUID } = Route.useParams()
  const {
    header: { setShowDashboardButton },
  } = useApp()

  useEffect(() => {
    setShowDashboardButton(true)
  })

  return <h1 className="text-3xl font-medium">Video {videoUUID}</h1>
}

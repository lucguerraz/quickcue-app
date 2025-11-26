import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/video/$videoUUID')({
  component: VideoPage,
})

function VideoPage() {
  const { videoUUID } = Route.useParams()
  return <h1 className="text-3xl font-medium">Video {videoUUID}</h1>
}

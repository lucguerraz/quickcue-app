import { useEffect, useState } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { useAuth } from '@/context/Auth'
import { useApp } from '@/context/App'
import { VideoCollection } from '@/components/Dashboard/VideoCollection'
import { VideoUpload } from '@/components/Dashboard/VideoUpload'
import type { uploadPreview } from '@/api/createVideo'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, search }) => {
    const searchParams = search as { modal?: string }
    if (!context.auth.isAuthenticated() && searchParams.modal !== 'login') {
      redirect({
        to: '.',
        search: {
          modal: 'login',
          redirect: location.href,
        },
        mask: {
          to: '/login',
        },
        throw: true,
      })
    }
  },
  component: App,
})

function App() {
  const auth = useAuth()
  const {
    header: { setShowDashboardButton },
  } = useApp()

  const [uploadingVideo, setUploadingVideo] = useState<uploadPreview | null>(null)

  useEffect(() => {
    setShowDashboardButton(false)
  })

  if (!auth.isAuthenticated()) return <p>Please Login</p>

  return (
    <section className="@container">
      <div className="mx-6 flex items-center justify-between pt-6">
        <h1 className="text-4xl leading-none font-medium text-text-primary">Videos</h1>
        <VideoUpload setUploadingVideo={setUploadingVideo} />
      </div>
      <VideoCollection uploadingVideo={uploadingVideo} setUploadingVideo={setUploadingVideo} />
    </section>
  )
}

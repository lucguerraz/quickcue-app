import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query'
import { getVideo, type GetVideoSuccess } from '@/api/getVideo'
import { Modal } from '@/components/Core/Modal'
import { Input } from '@/components/Core/Input'
import { Button } from '@/components/Core/Button'
import { AlertCircle } from 'react-feather'
import { updateVideo, type UpdateVideoError } from '@/api/updateVideo'
import { deleteVideo, type DeleteVideoError } from '@/api/deleteVideo'

export const Route = createFileRoute('/video/$videoUUID/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { videoUUID } = Route.useParams()
  const navigate = useNavigate()

  const { isPending, data, isError, refetch } = useQuery({
    queryKey: ['video', videoUUID],
    queryFn: async () => {
      const api = await getVideo(videoUUID)

      if (api.success) {
        return (api as GetVideoSuccess).videoData
      }

      throw new Error(api.message)
    },
  })

  const [formError, setFormError] = useState('')
  const [inputNameError, setInputNameError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  const handleSave = async (e: any, close: () => void) => {
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    if (!formJson.name) {
      setInputNameError("can't be empty")
      return
    } else {
      setInputNameError('')
    }

    const api = await updateVideo(videoUUID as string, formJson.name as string)

    if (api.success) {
      await refetch()
      close()
    }

    if (!api.success) {
      if ((api as UpdateVideoError).errors.name && (api as UpdateVideoError).errors.name.length > 0) {
        setInputNameError((api as UpdateVideoError).errors.name[0])
      } else {
        setInputNameError('')
      }

      if (
        Object.keys((api as UpdateVideoError).errors).length < 1 &&
        (api as UpdateVideoError).message &&
        (api as UpdateVideoError).message.length > 0
      ) {
        setFormError((api as UpdateVideoError).message)
      } else {
        setFormError('')
      }
    }
  }

  const handleClose = () => {
    setInputNameError('')
    setFormError('')
    setDeleteError('')
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Video and all it's comments?")) {
      const api = await deleteVideo(videoUUID)

      if (api.success) {
        navigate({ to: '/' })
        return
      }

      if (!api.success) {
        if ((api as DeleteVideoError).message && (api as DeleteVideoError).message.length > 0) {
          setDeleteError((api as DeleteVideoError).message)
        } else {
          setDeleteError('')
        }
      }
    }
  }

  if (isError) {
    return null
  }

  if (isPending) {
    return null
  }

  return (
    <Modal title="Edit Video" onSave={handleSave} onClose={handleClose}>
      <Input label="Video Title" name="name" defaultValue={data.name} error={inputNameError} />
      <div>
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Video</span>
          <Button variant="wire-danger" size="medium" onClick={handleDelete}>
            Delete Video
          </Button>
        </div>
        {deleteError && (
          <p className="flex items-center gap-1 text-xs text-surface-danger">
            <AlertCircle width="1em" height="1em" />
            <span>{deleteError}</span>
          </p>
        )}
      </div>
      {formError && (
        <p className="flex items-center gap-1 text-xs text-surface-danger">
          <AlertCircle width="1em" height="1em" />
          <span>{formError}</span>
        </p>
      )}
    </Modal>
  )
}

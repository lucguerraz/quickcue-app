import React, { useState } from 'react'

import { useAuth } from '@/context/Auth'
import { NewComment } from '@/components/Video/Comments/NewComment'
import { LinkButton } from '@/components/Core/LinkButton'
import { Comment } from '@/components/Video/Comments/Comment'
import { type Comment as CommentType } from '@/api/getComments'
import { createComment, type CreateCommentSuccess, type CreateCommentError } from '@/api/createComment'
import { Button } from '@/components/Core/Button'
import { AlertCircle } from 'react-feather'

export interface CommentSectionProps {
  videoUUID: string
  videoTimecode: number
  videoLength: number
  videoEventTarget: EventTarget
  comments: CommentType[]
  reload: () => Promise<any>
  className?: string
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  videoUUID,
  videoTimecode,
  videoLength,
  videoEventTarget,
  comments,
  reload,
  className = '',
}) => {
  const [newCommentErrors, setNewCommentErrors] = useState({})
  const [optimisticComments, setOptimisticComments] = useState<CommentType[]>([])
  const { isAuthenticated } = useAuth()

  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>, reset: () => void) => {
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    let errors: { [key: string]: string } = {}

    if (!formJson.message) {
      errors.message = "can't be empty"
    }

    if (!formJson.startTimestamp_raw) {
      errors.timestamp_start = 'must be set'
    }

    let endTimestamp_raw: number
    if (formJson.endTimestamp_raw) {
      endTimestamp_raw = parseInt(formJson.endTimestamp_raw as string)
    } else {
      endTimestamp_raw = parseInt(formJson.startTimestamp_raw as string) + 1
    }

    setNewCommentErrors(errors)
    if (Object.keys(errors).length > 0) return

    const api = await createComment(
      videoUUID,
      formJson.message as string,
      parseInt(formJson.startTimestamp_raw as string),
      endTimestamp_raw,
    )

    if (api.success) {
      const newComment = (api as CreateCommentSuccess).commentData
      setOptimisticComments((value) => [newComment, ...value])
      reset()
      refreshData()
    }

    if (!api.success) {
      let errors: { [key: string]: string } = {}

      for (const error in (api as CreateCommentError).errors) {
        if ((api as CreateCommentError).errors[error] && (api as CreateCommentError).errors[error].length > 0) {
          errors[error] = (api as CreateCommentError).errors[error][0]
        }
      }

      if (
        Object.keys(errors).length < 1 &&
        (api as CreateCommentError).message &&
        (api as CreateCommentError).message.length > 0
      ) {
        errors.form = (api as CreateCommentError).message
      }

      setNewCommentErrors(errors)
    }
  }

  const refreshData = async () => {
    await reload()
    setOptimisticComments([])
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {isAuthenticated() ? (
        <NewComment
          videoTimecode={videoTimecode}
          videoLength={videoLength}
          videoEventTarget={videoEventTarget}
          onSubmit={handleNewComment}
          errors={newCommentErrors}
        />
      ) : (
        <div className="flex flex-col items-start gap-2 rounded-xl bg-surface-secondary p-4 leading-tight">
          <p className="text-base font-medium">New Comment</p>
          <LinkButton
            to="."
            search={{
              modal: 'login',
            }}
            mask={{
              to: '/login',
            }}
            size="medium"
          >
            Login to comment
          </LinkButton>
        </div>
      )}
      {[...optimisticComments, ...comments].length > 0 ? (
        [...optimisticComments, ...comments]
          .sort((a, b) => a.timestamp_start - b.timestamp_start)
          .map(({ uuid, message, updated_at, user }) => (
            <Comment
              key={uuid}
              uuid={uuid}
              useruuid={user.uuid}
              username={user.name}
              userpic={user.picture}
              lastModified={updated_at}
            >
              {message}
            </Comment>
          ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 p-8">
          <p className="flex items-center gap-1 text-xs leading-none text-text-secondary-contrast">
            <AlertCircle height="1em" width="1em" />
            No comments to show
          </p>
          <h2 className="text-text-primar text-center text-base leading-tight font-medium">
            There aren't any comments yet
          </h2>
          <Button variant="secondary" size="small" onClick={() => document.getElementById('message')?.focus()}>
            Add a coment
          </Button>
        </div>
      )}
    </div>
  )
}

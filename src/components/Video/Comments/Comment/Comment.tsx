import React from 'react'

import { createAvatar } from '@dicebear/core'
import { notionistsNeutral } from '@dicebear/collection'

export interface CommentProps {
  children: React.ReactNode
  useruuid: string
  userpic: string | null
  username: string
  lastModified: string
  className?: string
}

export const Comment: React.FC<CommentProps> = ({
  children,
  useruuid,
  userpic,
  username,
  lastModified,
  className = '',
}) => {
  function timeAgo(isoDate: string): string {
    const past = new Date(isoDate)

    if (isNaN(past.getTime())) {
      return ''
    }

    const now = new Date()
    let diffMs = now.getTime() - past.getTime()

    if (diffMs < 0) diffMs = 0 // Future dates

    const diffSeconds = Math.floor(diffMs / 1000)

    if (diffSeconds < 60) {
      return 'just now' // < 1 minute
    }

    const diffMinutes = Math.floor(diffSeconds / 60)
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago` // 1–59 minutes
    }

    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) {
      return `${diffHours}h ago` // 1–23 hours
    }

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) {
      return `${diffDays}d ago` // 1–6 days
    }

    const diffWeeks = Math.floor(diffDays / 7)
    if (diffWeeks < 4) {
      return `${diffWeeks}w ago` // 1–3 weeks
    }

    const diffMonths = Math.floor(diffDays / 30)
    if (diffMonths < 12) {
      return `${diffMonths}mo ago` // 1–11 months
    }

    const diffYears = Math.floor(diffDays / 365)
    return `${diffYears}y ago` // 1+ years
  }

  return (
    <article className={`flex flex-col gap-3 rounded-xl bg-surface-secondary p-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-2 text-sm after:h-0.5 after:w-0.5 after:rounded-full after:bg-text-secondary-contrast">
        {userpic !== null ? (
          <img src={userpic} alt={`Profile Picture of ${username}`} className="h-8 w-8 rounded-md object-cover" />
        ) : (
          <div
            className="h-8 w-8 overflow-hidden rounded-md bg-primary-300 object-cover"
            dangerouslySetInnerHTML={{
              __html: createAvatar(notionistsNeutral, {
                seed: useruuid,
                flip: true,
                backgroundColor: ['transparent'],
              }).toString(),
            }}
          ></div>
        )}

        <p>{username}</p>
        <p className="order-last text-text-secondary-contrast">{timeAgo(lastModified)}</p>
      </div>
      <p className="text-sm text-pretty text-text-secondary">{children}</p>
    </article>
  )
}

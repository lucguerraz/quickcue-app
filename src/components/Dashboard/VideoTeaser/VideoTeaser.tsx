import React from 'react'

import { Link } from '@tanstack/react-router'

export interface VideoTeaserProps {
  uuid: string
  thumbnail: string
  title: string
  commentsNumber: number
  lastModified: string
  className?: string
}

export const VideoTeaser: React.FC<VideoTeaserProps> = ({
  uuid,
  thumbnail,
  title,
  commentsNumber,
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
    <article
      className={`rounded-xl p-3 transition-colors duration-300 hover:bg-surface-secondary [&:has(:focus-visible)]:z-50 [&:has(:focus-visible)]:bg-surface-secondary [&:has(:focus-visible)]:ring [&:has(:focus-visible)]:ring-text-primary ${className}`}
    >
      <Link
        to="/video/$videoUUID"
        params={{ videoUUID: uuid }}
        className="flex flex-col gap-2 rounded-lg outline-0"
        tabIndex={0}
      >
        <img src={thumbnail} alt="" className="aspect-video rounded-lg object-cover" />
        <h2
          title={title}
          className="overflow-hidden mask-r-from-black mask-r-from-60% mask-r-to-transparent mask-r-to-95% text-xl leading-[1.1] whitespace-nowrap text-text-primary"
        >
          {title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-sm leading-[1.1] text-text-secondary-contrast after:h-0.5 after:w-0.5 after:rounded-full after:bg-text-secondary-contrast">
          <p>{commentsNumber + ' ' + (commentsNumber == 1 ? 'Comment' : 'Comments')}</p>
          <p className="order-last">Last modified {timeAgo(lastModified)}</p>
        </div>
      </Link>
    </article>
  )
}

import React from 'react'

import { Link } from '@tanstack/react-router'

export interface VideoTeaserUploadingProps {
  uuid: string
  title: string
  poster?: string
  status: string
  progress?: number
  className?: string
}

export const VideoTeaserUploading: React.FC<VideoTeaserUploadingProps> = ({
  uuid,
  title,
  poster = null,
  status,
  progress = null,
  className = '',
}) => {
  return (
    <article
      className={`rounded-xl p-3 transition-colors duration-300 hover:bg-surface-secondary [&:has(:focus-visible)]:z-50 [&:has(:focus-visible)]:bg-surface-secondary [&:has(:focus-visible)]:ring [&:has(:focus-visible)]:ring-text-primary ${className}`}
    >
      <Link
        disabled={true}
        to="/video/$videoUUID"
        params={{ videoUUID: uuid }}
        className="flex flex-col gap-2 rounded-lg outline-0"
      >
        {status !== 'done' || !poster ? (
          <div className="relative flex aspect-video items-center justify-center p-8">
            <label className="z-10 flex w-full flex-col-reverse items-center gap-1">
              <span className="text-text-secondary-contrast">
                {status.charAt(0).toUpperCase() + status.slice(1)}...
              </span>
              <progress
                value={progress || 0}
                max="100"
                className="h-2 w-full rounded-full bg-surface-brand [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-surface-brand-contrast [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-surface-brand [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-surface-brand-contrast"
              ></progress>
            </label>
            <div className="absolute top-0 left-0 h-full w-full rounded-lg bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
          </div>
        ) : (
          <img src={poster} alt="" className="aspect-video rounded-lg object-cover" />
        )}
        <h2
          title={title}
          className="overflow-hidden mask-r-from-black mask-r-from-60% mask-r-to-transparent mask-r-to-95% text-xl leading-[1.1] whitespace-nowrap text-text-primary"
        >
          {title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-sm leading-[1.1] text-text-secondary-contrast after:h-0.5 after:w-0.5 after:rounded-full after:bg-text-secondary-contrast">
          <p>0 Comments</p>
          <p className="order-last">Last modified just now</p>
        </div>
      </Link>
    </article>
  )
}

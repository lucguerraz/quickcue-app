import React from 'react'

export interface VideoTeaserSkeletonProps {
  className?: string
}

export const VideoTeaserSkeleton: React.FC<VideoTeaserSkeletonProps> = ({ className = '' }) => {
  return (
    <article className={`rounded-xl p-3 duration-300 ${className}`}>
      <div className="flex flex-col gap-2 rounded-lg outline-0">
        <div className="aspect-video w-full rounded-lg bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
        <div className="h-5 w-4/5 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
        <div className="flex flex-wrap items-center gap-2 text-text-secondary-contrast after:h-0.5 after:w-0.5 after:rounded-full after:bg-gray-200">
          <div className="h-4 w-1/4 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
          <div className="order-last h-4 w-1/4 rounded bg-gray-200 duration-500 not-motion-reduce:animate-pulse"></div>
        </div>
      </div>
    </article>
  )
}

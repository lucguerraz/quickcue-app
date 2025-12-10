import React from 'react'

import { type Comment } from '@/api/getComments'

export interface CommentsBarProps {
  timecode: number
  duration: number
  comments: Comment[]
  className?: string
}

export const CommentsBar: React.FC<CommentsBarProps> = ({ timecode, duration, comments, className = '' }) => {
  const commentLayers: Comment[][] = [[]]

  comments.forEach((comment) => {
    commentLayers.every((layer, layerIndex, thisLayer) => {
      let fitsInCurrentLayer = true
      layer.every((layerComment) => {
        if (
          comment.timestamp_end > layerComment.timestamp_start - 5 &&
          comment.timestamp_start < layerComment.timestamp_end + 5
        ) {
          fitsInCurrentLayer = false
          return false
        }

        return true
      })

      if (fitsInCurrentLayer) {
        layer.push(comment)
        return false
      }

      if (!fitsInCurrentLayer && layerIndex == commentLayers.length - 1) {
        thisLayer.push([comment])
        return false
      }

      return true
    })
  })

  const uuidToHue = (uuid: string): number => {
    let hash = 2166136261 >>> 0
    for (let i = 0; i < uuid.length; i++) {
      hash ^= uuid.charCodeAt(i) >>> 0
      hash = (hash * 16777619) >>> 0
    }
    return hash % 361
  }

  const handleClick = async (uuid: string) => {
    const commentEl = document.querySelector(`#comment_${uuid}`)

    if (!commentEl) return

    await new Promise((resolve) => {
      commentEl.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'smooth',
      })

      const observer = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          obs.disconnect()
          resolve(null)
        }
      })

      observer.observe(commentEl)
    })

    commentEl.classList.add('flash')

    const onEnd = () => {
      commentEl.classList.remove('flash')
      commentEl.removeEventListener('animationend', onEnd)
    }
    commentEl.addEventListener('animationend', onEnd)
  }

  return (
    <div className={`relative flex w-full flex-col items-start gap-2 py-3 ${className}`}>
      <div
        style={{
          left: (100 / duration) * timecode + '%',
        }}
        className="absolute top-0 z-10 h-full w-0.5 -translate-x-1/2 bg-surface-primary"
      ></div>
      {commentLayers.map((layer) => (
        <div key={btoa(JSON.stringify(layer)).slice(20, 40)} className="relative h-2 w-full">
          {layer.map(({ uuid, timestamp_start, timestamp_end }) => {
            if (duration === 0) return null

            const comment_offset = (100 / duration) * timestamp_start
            const comment_length = (100 / duration) * timestamp_end - comment_offset

            let colorHue = uuidToHue(uuid)
            if (colorHue > 280 && colorHue < 300) {
              colorHue = colorHue * 0.9
            } else if (colorHue > 300) {
              colorHue = colorHue * 1.1
            }

            return (
              <button
                key={uuid}
                onClick={() => handleClick(uuid)}
                data-start={comment_offset}
                data-end={comment_offset + comment_length}
                style={{
                  left: comment_offset + '%',
                  width: comment_length + '%',
                  backgroundColor: `hsl(${colorHue}, 80%, 80%)`,
                }}
                className="absolute h-2 min-w-2 cursor-pointer outline-0 not-data-[end=100]:rounded-r-full not-data-[start=0]:rounded-l-full hover:opacity-90 focus:opacity-90 focus:ring-1 focus:ring-text-primary-inverted focus:ring-offset-1 focus:ring-offset-surface-primary-inverted"
              ></button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

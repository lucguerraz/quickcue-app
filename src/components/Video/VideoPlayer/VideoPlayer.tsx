import React, { useState, useRef, useCallback, useEffect } from 'react'

import * as dashjs from 'dashjs'
import { ProgressBar } from '@/components/Video/VideoPlayer/ProgressBar'
import { type Comment } from '@/api/getComments'
import { CommentsBar } from '@/components/Video/VideoPlayer/CommentsBar'

export interface VideoPlayerProps {
  videoUrl: string
  eventTarget: EventTarget
  comments: Comment[]
  setVideoLength: (value: number) => void
  setVideoTimecode: (value: number) => void
  className?: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  eventTarget,
  comments,
  setVideoLength,
  setVideoTimecode,
  className = '',
}) => {
  const playerRef = useRef<dashjs.MediaPlayerClass | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(true)
  const isPlayingRef = useRef(false)
  const [timecode, setTimecode] = useState(0)
  const [duration, setDuration] = useState(0)

  const callbackRef = useCallback((node: HTMLVideoElement | null) => {
    if (node !== null) {
      playerRef.current = dashjs.MediaPlayer().create()

      playerRef.current.initialize(node, videoUrl, false)
      playerRef.current.updateSettings({
        streaming: {
          scheduling: {
            scheduleWhilePaused: true,
          },
        },
      })

      playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, () => {
        setIsBuffering(false)
        setIsPlaying(true)
        isPlayingRef.current = true
      })

      playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, () => {
        if (!isPlayingRef.current) return
        setIsPlaying(false)
        isPlayingRef.current = false
      })

      playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_TIME_UPDATED, () => {
        setTimecode(node.currentTime)
        setVideoTimecode(node.currentTime)
      })

      playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_LOADED_DATA, () => {
        setDuration(playerRef.current!.duration())
        setVideoLength(playerRef.current!.duration())
      })

      playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_WAITING, () => {
        setIsBuffering(true)
      })

      playerRef.current.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
        setIsBuffering(false)
      })
    }
  }, [])

  const playPause = () => {
    if (!playerRef.current) return

    if (!isPlayingRef.current) playerRef.current.play()
    if (isPlayingRef.current) playerRef.current.pause()
  }

  const seekTo = (timecode: number) => {
    if (!playerRef.current) return
    playerRef.current.seekToPresentationTime(timecode)
  }

  const handlePauseEvent = () => {
    if (!playerRef.current) return

    playerRef.current.pause()
  }

  useEffect(() => {
    eventTarget.addEventListener('pause', handlePauseEvent)

    return () => {
      eventTarget.removeEventListener('pause', handlePauseEvent)
    }
  })

  return (
    <figure className={`relative aspect-video rounded-lg bg-surface-primary-inverted ${className}`}>
      <video ref={callbackRef} className="h-full w-full rounded-lg" tabIndex={-1} />
      <ProgressBar
        timecode={timecode}
        duration={duration}
        isPlaying={isPlaying}
        isBuffering={isBuffering}
        playPause={playPause}
        seekTo={seekTo}
        className="absolute top-0"
      />
      <CommentsBar timecode={timecode} duration={duration} comments={comments} className="" />
    </figure>
  )
}

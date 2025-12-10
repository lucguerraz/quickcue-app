import React, { useEffect, useState } from 'react'

import { Pause, Play } from 'react-feather'

export interface ProgressBarProps {
  timecode: number
  duration: number
  isPlaying: boolean
  isBuffering: boolean
  playPause: () => void
  seekTo: (timecode: number) => void
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  timecode,
  duration,
  isPlaying,
  isBuffering,
  playPause,
  seekTo,
  className = '',
}) => {
  const [seekTimecode, setSeekTimecode] = useState<number | false>(false)

  const handleScrubbing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (duration / 100) * +e.target.value
    if (!isPlaying) setSeekTimecode(newTime)
    seekTo(newTime)
  }

  useEffect(() => {
    if (seekTimecode !== false && Math.trunc(timecode) === Math.trunc(seekTimecode)) {
      setSeekTimecode(false)
    }
    if (isPlaying && seekTimecode !== false) {
      setSeekTimecode(false)
    }
  }, [timecode])

  const playedSeconds = (Math.floor(seekTimecode !== false ? seekTimecode : timecode) % 60).toString().padStart(2, '0')
  const playedMinutes =
    (Math.floor(seekTimecode !== false ? seekTimecode : timecode) -
      (Math.floor(seekTimecode !== false ? seekTimecode : timecode) % 60)) /
    60

  const totalSeconds = (Math.floor(duration) % 60).toString().padStart(2, '0')
  const totalMinutes = (Math.floor(duration) - (Math.floor(duration) % 60)) / 60

  return (
    <figcaption
      className={`flex aspect-video w-full flex-col justify-end gap-2 text-text-primary-inverted select-none ${className}`}
    >
      <div className="z-10 flex justify-between px-3 text-sm leading-none">
        <div className="flex items-center gap-1">
          <label id="timer" htmlFor="videoProgress" role="timer" className="font-mono">
            {playedMinutes}:{playedSeconds}
          </label>
          <button
            id="play"
            aria-label="Play"
            role="button"
            onClick={playPause}
            className="flex h-[1.2em] w-[1.2em] appearance-none items-center justify-center rounded-xs outline-0 focus-visible:ring-1 focus-visible:ring-text-primary-inverted"
          >
            {isPlaying || seekTimecode !== false ? (
              isBuffering || seekTimecode !== false ? (
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-text-primary-inverted/30 border-t-text-primary-inverted">
                  <span className="sr-only">Loading</span>
                </div>
              ) : (
                <>
                  <span className="sr-only">Pause</span>
                  <Pause stroke="none" fill="currentColor" height="1.2em" className="[&>rect]:-translate-[0.4px]" />
                </>
              )
            ) : (
              <>
                <span className="sr-only">Play</span>
                <Play stroke="none" fill="currentColor" height="1.2em" />
              </>
            )}
          </button>
        </div>
        <label className="font-mono">
          {totalMinutes}:{totalSeconds}
        </label>
      </div>
      <div className="relative z-10 h-2">
        <progress
          id="videoProgress"
          max="100"
          value={duration === 0 ? 0 : (100 / duration) * (seekTimecode !== false ? seekTimecode : timecode)}
          className="absolute top-0 h-2 w-full bg-surface-brand [&::-moz-progress-bar]:bg-surface-brand-contrast [&::-webkit-progress-bar]:bg-surface-brand [&::-webkit-progress-value]:bg-surface-brand-contrast"
        >
          Progress
        </progress>
        <input
          type="range"
          id="seek"
          min="0"
          max="100"
          value={duration === 0 ? 0 : (100 / duration) * (seekTimecode !== false ? seekTimecode : timecode)}
          step="0.001"
          aria-label="Seek slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          onChange={handleScrubbing}
          className="absolute -top-0.5 -left-1.5 h-3 w-[calc(100%+0.75rem)] appearance-none outline-0 [-moz-appearance:none] [-webkit-appearance:none] [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-surface-primary [&::-moz-range-thumb]:[-moz-appearance:none] focus-visible:[&::-moz-range-thumb]:ring-2 focus-visible:[&::-moz-range-thumb]:ring-surface-primary-inverted [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:[-moz-appearance:none] [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:[-webkit-appearance:none] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-surface-primary [&::-webkit-slider-thumb]:[-webkit-appearance:none] focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-surface-primary-inverted"
        />
      </div>
      <button
        className="absolute top-0 h-full w-full bg-linear-0 from-surface-primary-inverted/50 to-surface-primary-inverted/0 to-25%"
        onClick={playPause}
        tabIndex={-1}
      ></button>
    </figcaption>
  )
}

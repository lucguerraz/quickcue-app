import React, { useState } from 'react'

import { AlertCircle, Clock, X as Close } from 'react-feather'
import { Button } from '@/components/Core/Button'
import { TimecodeInput } from '@/components/Video/Comments/NewComment/TimecodeInput'

export interface NewCommentProps {
  videoTimecode: number
  videoLength: number
  videoEventTarget: EventTarget
  errors?: { [key: string]: string }
  onSubmit: (e: React.FormEvent<HTMLFormElement>, reset: () => void) => void
  className?: string
}

export const NewComment: React.FC<NewCommentProps> = ({
  videoTimecode,
  videoLength,
  videoEventTarget,
  errors = {},
  onSubmit,
  className = '',
}) => {
  const [textareaValue, setTextareaValue] = useState('')
  const [startTimestamp, setStartTimestamp] = useState<number | false>(false)
  const [endTimestamp, setEndTimestamp] = useState<number | false>(false)

  const handleTextarea = (e: any) => {
    if (e.target.value.length > 0 && startTimestamp === false) {
      videoEventTarget.dispatchEvent(new CustomEvent('pause'))
      setStartTimestamp(videoTimecode)
    }

    e.target.style.height = ''
    const newHeight = `${e.target.scrollHeight}px`
    e.target.style.height = newHeight
    setTextareaValue(e.target.value)
  }

  const onSubmitInternal: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e, handleReset)
  }

  const handleReset = () => {
    setTextareaValue('')
    setStartTimestamp(false)
    setEndTimestamp(false)
  }

  return (
    <form
      className={`flex flex-col gap-2 rounded-xl bg-surface-secondary p-4 leading-tight ${className}`}
      aria-invalid={(errors?.form && true) || false}
      aria-errormessage={errors?.form ? 'newcommentform_error' : undefined}
      onSubmit={onSubmitInternal}
    >
      <label htmlFor="newcomment" className="text-base font-medium">
        New Comment
      </label>
      <div className="flex w-full flex-col items-start gap-0.5">
        <textarea
          name="message"
          id="message"
          onChange={handleTextarea}
          value={textareaValue}
          placeholder="I find/think..."
          rows={2}
          aria-invalid={(errors?.message && true) || false}
          aria-errormessage={errors?.message ? 'message_error' : undefined}
          className={`w-full resize-none rounded-md p-2 text-sm text-text-secondary-contrast outline-0 focus-visible:ring-1 focus-visible:ring-text-primary/50 ${errors?.message ? 'bg-surface-danger/10' : 'bg-surface-secondary-contrast'}`}
        ></textarea>
        {errors?.message && (
          <label
            htmlFor="message"
            id="message_error"
            aria-live="polite"
            className="flex items-center gap-1 text-xs text-surface-danger"
          >
            <AlertCircle width="1em" height="1em" />
            <span>Comment {errors.message}</span>
          </label>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex transform-gpu rounded-md bg-surface-secondary-contrast">
            {startTimestamp !== false && (
              <div
                className={`group flex rounded-l-md focus-within:[&+div>span]:bg-transparent ${errors?.timestamp_start ? 'bg-surface-danger/10' : ''}`}
              >
                <TimecodeInput
                  name="startTimestamp"
                  onChange={setStartTimestamp}
                  value={startTimestamp}
                  min={0}
                  absoluteMin={0}
                  max={endTimestamp !== false ? endTimestamp - 1 : videoLength - 1}
                  absoluteMax={videoLength - 1}
                  error={(errors?.timestamp_start && true) || false}
                  className="rounded-md focus:z-10"
                />
              </div>
            )}
            {endTimestamp !== false && (
              <div
                className={`group flex focus-within:[&+div>span]:bg-transparent ${errors?.timestamp_end ? 'bg-surface-danger/10' : ''}`}
              >
                <span className="w-[0.5px] bg-text-secondary-contrast group-focus-within:bg-transparent"></span>
                <TimecodeInput
                  name="endTimestamp"
                  onChange={setEndTimestamp}
                  value={endTimestamp}
                  min={startTimestamp !== false ? startTimestamp : 1}
                  absoluteMin={1}
                  max={videoLength}
                  absoluteMax={videoLength}
                  error={(errors?.timestamp_end && true) || false}
                  className="rounded-md focus:z-10"
                />
              </div>
            )}
            {startTimestamp !== false && endTimestamp === false && (
              <div className="group flex">
                <span className="w-[0.5px] bg-text-secondary-contrast group-focus-within:bg-transparent"></span>
                <button
                  type="button"
                  onClick={() => {
                    videoEventTarget.dispatchEvent(new CustomEvent('pause'))
                    setEndTimestamp(videoTimecode)
                  }}
                  className="flex aspect-square h-[calc(1rem*1.25+0.75rem)] appearance-none items-center justify-center rounded-md bg-surface-secondary-contrast text-sm text-text-secondary-contrast outline-0 focus:z-10 focus-visible:ring-1 focus-visible:ring-text-primary/50"
                >
                  <Clock height="1.1em" width="1.1em" />
                </button>
              </div>
            )}
            {startTimestamp !== false && (
              <div className="group flex">
                <span className="w-[0.5px] bg-text-secondary-contrast group-focus-within:bg-transparent"></span>
                <button
                  type="button"
                  onClick={() => {
                    if (endTimestamp !== false) {
                      setEndTimestamp(false)
                      return
                    }
                    setStartTimestamp(false)
                  }}
                  className="flex aspect-square h-[calc(1rem*1.25+0.75rem)] appearance-none items-center justify-center rounded-md bg-surface-secondary-contrast text-sm text-text-secondary-contrast outline-0 focus:z-10 focus-visible:ring-1 focus-visible:ring-text-primary/50"
                >
                  <Close height="1.1em" width="1.1em" />
                </button>
              </div>
            )}
            {startTimestamp === false && (
              <button
                type="button"
                onClick={() => {
                  videoEventTarget.dispatchEvent(new CustomEvent('pause'))
                  setStartTimestamp(videoTimecode)
                }}
                className="flex aspect-square h-[calc(1rem*1.25+0.75rem)] appearance-none items-center justify-center rounded-md bg-surface-secondary-contrast text-sm text-text-secondary-contrast outline-0 focus:z-10 focus-visible:ring-1 focus-visible:ring-text-primary/50"
              >
                <Clock height="1.1em" width="1.1em" />
              </button>
            )}
          </div>
          <Button type="submit" size="small">
            Comment
          </Button>
        </div>
        {errors?.timestamp_start && (
          <label
            htmlFor="startTimestamp"
            id="startTimestamp_error"
            aria-live="polite"
            className="flex items-center gap-1 text-xs text-surface-danger"
          >
            <AlertCircle width="1em" height="1em" />
            <span>Start time {errors.timestamp_start}</span>
          </label>
        )}
        {errors?.timestamp_end && (
          <label
            htmlFor="endTimestamp"
            id="endTimestamp_error"
            aria-live="polite"
            className="flex items-center gap-1 text-xs text-surface-danger"
          >
            <AlertCircle width="1em" height="1em" />
            <span>End time {errors.timestamp_end}</span>
          </label>
        )}
      </div>
      {errors?.form && (
        <label
          id="newcommentform_error"
          aria-live="polite"
          className="flex items-center gap-1 text-xs text-surface-danger"
        >
          <AlertCircle width="1em" height="1em" />
          <span>{errors.form}</span>
        </label>
      )}
    </form>
  )
}

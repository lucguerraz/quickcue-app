import React, { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

import tw from '@utils/tw'
import { AlertCircle, AlertTriangle, CheckCircle } from 'react-feather'
import { Button } from '@/components/Core/Button'

export interface ToastProps {
  id: string
  variant?: 'error' | 'warning' | 'success'
  message: string
  detail?: string
  trigger: string
  dismount: (id: string) => void
  className?: string
}

export const Toast: React.FC<ToastProps> = ({
  id,
  variant = 'error',
  message,
  detail,
  trigger,
  dismount,
  className = '',
}) => {
  const baseStyles = tw`relative flex w-[600px] max-w-[90vw] transform-gpu items-center justify-between gap-3 overflow-hidden rounded-lg px-4 pt-3 pb-3.5 drop-shadow-[0_0_6px] drop-shadow-surface-primary-inverted/40`
  const animationStyles = tw`data-[state=hidden]:animate-out data-[state=hidden]:duration-300 data-[state=hidden]:fade-out-0 data-[state=hidden]:slide-out-to-top data-[state=shown]:animate-in data-[state=shown]:duration-500 data-[state=shown]:slide-in-from-bottom`

  const variantStyles = {
    error: tw`bg-surface-danger text-text-danger`,
    warning: tw`bg-surface-warning text-text-danger`,
    success: tw`bg-surface-success text-text-danger`,
  }

  const iconElements = {
    error: <AlertCircle height="1em" width="1em" />,
    warning: <AlertTriangle height="1em" width="1em" />,
    success: <CheckCircle height="1em" width="1em" />,
  }

  const [state, setState] = useState('shown')
  const [transition, setTransition] = useState('')
  const [progress, setProgress] = useState(10000)
  let interval: number

  useEffect(() => {
    interval = window.setInterval(() => {
      if (progress <= 0) {
        clearInterval(interval)
        document.startViewTransition(() => {
          flushSync(() => {
            setState('hidden')
            setTransition('')
          })
          dismount(id)
        })
        return
      }
      if (progress < 15) {
        setTransition('[view-transition-name:app-toast-slide-out]')
      }
      setProgress(progress - 10)
    }, 10)

    return () => {
      clearInterval(interval)
    }
  })

  const handleDismiss = () => {
    clearInterval(interval)
    flushSync(() => {
      setTransition('[view-transition-name:app-toast-slide-out]')
    })
    document.startViewTransition(() => {
      flushSync(() => {
        setState('hidden')
        setTransition('')
      })
      dismount(id)
    })
  }

  return (
    <output
      data-state={state}
      htmlFor={trigger}
      className={`${baseStyles} ${animationStyles} ${transition} ${variantStyles[variant]} ${className}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-lg leading-tight font-medium">{message}</p>
        {detail && (
          <p className="flex items-center gap-2 text-sm leading-tight opacity-80">
            {iconElements[variant]}
            {detail}
          </p>
        )}
      </div>
      <Button variant="translucent" onClick={handleDismiss}>
        Dismiss
      </Button>
      <progress
        value={progress}
        max="10000"
        className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-text-danger/20 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-text-danger [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-text-danger/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-text-danger"
      ></progress>
    </output>
  )
}

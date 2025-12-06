import React from 'react'
import { flushSync } from 'react-dom'

import { useApp } from '@/context/App'
import { Toast } from '@/components/Core/Toast'

export interface ToastStackProps {
  className?: string
}

export const ToastStack: React.FC<ToastStackProps> = ({ className = '' }) => {
  const {
    toast: { stack, setStack },
  } = useApp()

  const handleDismount = (uuid: string) => {
    let newStack = { ...stack }
    delete newStack[uuid]
    flushSync(() => {
      setStack(newStack)
    })
  }

  return (
    <div className={`fixed bottom-6 left-1/2 flex -translate-x-1/2 transform-gpu flex-col gap-3 ${className}`}>
      {Object.values(stack).map(({ id, status, message, detail, trigger }) => {
        return (
          <Toast
            key={id}
            id={id}
            variant={status}
            message={message}
            detail={detail}
            trigger={trigger}
            dismount={handleDismount}
          />
        )
      })}
    </div>
  )
}

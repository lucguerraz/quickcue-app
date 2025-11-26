import React, { useState, useEffect } from 'react'

import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/Core/Button'

export interface ModalProps {
  title: string
  children: React.ReactNode
  onSave: (e: React.FormEvent, close: () => void) => void
  closePath?: string
  className?: string
}

export const Modal: React.FC<ModalProps> = ({ title, children, onSave, closePath = '..', className = '' }) => {
  const navigate = useNavigate()
  const [state, setState] = useState('open')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const close = () => {
      setState('closed')
      navigate({ to: closePath, viewTransition: true })
    }

    onSave(e, close)
  }

  useEffect(() => {
    document.querySelector('dialog')!.focus()
  })

  // https://klapacz.dev/blog/0003-tanstack-router-animated-modals/
  return (
    <>
      <div
        data-state={state}
        className="fixed inset-0 z-50 h-full w-full transform-gpu bg-black/20 [view-transition-name:app-modal-fade-out] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:duration-500 data-[state=open]:fade-in-0"
      ></div>
      <dialog
        tabIndex={-1}
        open
        data-state={state}
        className={`fixed inset-x-0 bottom-0 left-1/2 z-50 max-h-[90vh] min-h-[80vh] w-full max-w-160 -translate-x-1/2 transform-gpu overflow-scroll rounded-t-lg p-6 pb-10 transition ease-in-out outline-none [view-transition-name:app-modal-slide-out] data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:duration-500 data-[state=open]:slide-in-from-bottom ${className}`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 after:h-px after:w-full after:bg-surface-secondary-contrast"
        >
          <header className="sticky flex items-center justify-between">
            <h2 className="text-2xl font-medium">{title}</h2>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setState('closed')
                  navigate({ to: closePath, viewTransition: true })
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </header>
          <main className="order-last flex flex-col gap-10 *:relative *:after:absolute *:after:-bottom-4 *:after:h-px *:after:w-full *:after:bg-surface-secondary-contrast">
            {children}
          </main>
        </form>
      </dialog>
    </>
  )
}

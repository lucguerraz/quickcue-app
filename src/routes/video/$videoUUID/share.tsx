import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Modal } from '@/components/Core/Modal'
import { Button } from '@/components/Core/Button'

export const Route = createFileRoute('/video/$videoUUID/share')({
  component: RouteComponent,
})

function RouteComponent() {
  const { videoUUID } = Route.useParams()

  const [coppied, setCoppied] = useState(false)

  const handleClose = () => {}

  const handleCopy = () => {
    setCoppied(true)
    navigator.clipboard.writeText(`${import.meta.env.VITE_HOST}/video/${videoUUID}`)
    setTimeout(() => setCoppied(false), 3000)
  }

  return (
    <Modal
      title="Share Video"
      onSave={() => {}}
      onClose={handleClose}
      showSubmitButton={false}
      closeButtonText={'Close'}
    >
      <div>
        <div className="relative flex w-full items-center justify-between pb-2 text-text-primary has-disabled:opacity-50">
          <div className="w-1 shrink grow">
            <p className="text-xl font-medium">Public Link</p>
            <p className="overflow-hidden mask-r-from-black mask-r-from-60% mask-r-to-transparent mask-r-to-95% text-sm leading-[1.1] whitespace-nowrap">{`${import.meta.env.VITE_HOST}/video/${videoUUID}`}</p>
          </div>
          <Button variant="wire" size="medium" onClick={handleCopy} className="relative shrink-0 grow-0">
            <span className={`${coppied && 'animate-showMessageMain'} transform-gpu`}>Copy link</span>
            <span
              className={`${coppied && 'animate-showMessageSecondary'} absolute left-1/2 -translate-x-1/2 transform-gpu opacity-0`}
            >
              Coppied
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

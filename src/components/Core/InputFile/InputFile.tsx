import React, { useState } from 'react'

import { AlertCircle } from 'react-feather'
import { Button } from '@/components/Core/Button'

export interface InputFileProps {
  label: string
  name: string
  value?: string
  disabled?: boolean
  error?: string
  onChange?: (e: any) => void
  className?: string
}

export const InputFile: React.FC<InputFileProps> = ({
  label,
  name,
  value = '',
  disabled = false,
  error = '',
  onChange,
  className = '',
}) => {
  const [previewImg, setPreviewImg] = useState(value)
  const handlePreview = (e: any) => {
    const [file] = e.currentTarget.files
    if (file) {
      setPreviewImg(URL.createObjectURL(file))
    }

    if (onChange) onChange(e)
  }
  return (
    <label
      className={`relative block w-full pb-5 has-disabled:pointer-events-none has-disabled:opacity-50 ${className}`}
    >
      <div className="flex justify-between gap-3">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xl font-medium">{label}</span>
          <Button
            type="button"
            onClick={() => document.getElementById(name)?.click()}
            size="small"
            variant="wire"
            disabled={disabled}
          >
            Upload {previewImg !== '' && 'New'} Picture
          </Button>
          <input
            id={name}
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            name={name}
            onChange={handlePreview}
            disabled={disabled}
            className="hidden"
          />
        </div>
        <div className={`h-15 w-15 rounded-lg border-0 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary'}`}>
          {previewImg !== '' && <img src={previewImg} alt="" className="h-full w-full rounded-lg object-cover" />}
        </div>
      </div>
      {error && (
        <p className="absolute bottom-0 flex items-center gap-1 text-xs text-surface-danger">
          <AlertCircle width="1em" height="1em" />
          <span>
            {label} {error}
          </span>
        </p>
      )}
    </label>
  )
}

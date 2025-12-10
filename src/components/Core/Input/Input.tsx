import React from 'react'

import { AlertCircle } from 'react-feather'

export interface InputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'number'
  value?: string
  defaultValue?: string
  disabled?: boolean
  error?: string
  onChange?: (e: React.ChangeEvent) => void
  className?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value = undefined,
  defaultValue = undefined,
  disabled = false,
  error = '',
  onChange,
  className = '',
}) => {
  return (
    <label className={`relative flex w-full flex-col gap-1 pb-5 has-disabled:opacity-50 ${className}`}>
      <span className="text-xl font-medium">{label}</span>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full rounded-md px-3 py-1.5 outline-0 focus:ring-1 focus-visible:ring-text-primary/50 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary focus:bg-surface-secondary-contrast'}`}
      />
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

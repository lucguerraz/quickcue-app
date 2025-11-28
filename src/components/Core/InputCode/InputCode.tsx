import React, { useState, useRef } from 'react'

import { AlertCircle } from 'react-feather'

export interface InputCodeProps {
  label: string
  name: string
  defaultValue?: string
  disabled?: boolean
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, code: (string | undefined)[]) => void
  className?: string
}

export const InputCode: React.FC<InputCodeProps> = ({
  label,
  name,
  defaultValue = '',
  disabled = false,
  error = '',
  onChange,
  className = '',
}) => {
  const initialCode: (string | undefined)[] = defaultValue
    .split('')
    .concat(Array(6 - defaultValue.length).fill(undefined))
    .slice(0, 6)
  const [code, setCode] = useState(initialCode)

  const inputsRef = useRef(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const charIndex = +e.target.name.replace(`${name}_char`, '')
    let editingCharIndex = charIndex
    let modCode = [...code]

    const originalInput = e.target.value.replaceAll(/[^0-9]/g, '').split('')
    let input = originalInput

    if (modCode[charIndex - 1] === undefined && charIndex !== 0) {
      input = []
    }

    let digit = input.shift()
    modCode[charIndex] = digit

    input.forEach((val, index) => {
      if (modCode[charIndex + index + 1] === undefined && charIndex + index + 1 <= 5) {
        modCode[charIndex + index + 1] = val
      }
      editingCharIndex = charIndex + index + 1
      selectDigitInput(`input[name="${name}_char${editingCharIndex}"]`)?.focus()
    })

    if (modCode[editingCharIndex] && editingCharIndex < 5 && !modCode[editingCharIndex + 1]) {
      selectDigitInput(`input[name="${name}_char${editingCharIndex + 1}"]`)?.focus()
    }
    if (modCode[editingCharIndex] && editingCharIndex === 5) {
      selectDigitInput(`input[name="${name}_char${charIndex}"]`)?.blur()
    }
    if (modCode[editingCharIndex] === undefined) {
      modCode.every((val, index) => {
        if (!val) {
          modCode[index] = originalInput.shift()
          selectDigitInput(`input[name="${name}_char${index}"]`)?.focus()
          return false
        }
        return true
      })
    }
    if (e.target.value === '' && editingCharIndex - 1 >= 0 && modCode[editingCharIndex + 1] === undefined) {
      selectDigitInput(`input[name="${name}_char${editingCharIndex - 1}"]`)?.focus()
    }

    if (onChange) onChange(e, modCode)
    setCode(modCode)
  }

  const selectDigitInput = (selector: string): HTMLElement | null => {
    const inputs: HTMLElement | null = inputsRef.current
    if (inputs) return (inputs as HTMLElement).querySelector(selector) as HTMLElement
    return null
  }

  return (
    <label className={`relative flex w-full flex-col gap-1 pb-5 has-disabled:opacity-50 ${className}`}>
      <span className="text-xl font-medium">{label}</span>
      <div ref={inputsRef} className="flex gap-2">
        <input
          type="text"
          name={`${name}_char0`}
          onChange={handleInput}
          value={code.slice(0, 1).join('')}
          disabled={disabled}
          className={`w-[calc(1ch+1.5rem+2px)] rounded-md px-3 py-1.5 text-center outline-0 focus:ring-1 focus-visible:ring-text-primary/50 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary focus:bg-surface-secondary-contrast'}`}
        />
        <input
          type="text"
          name={`${name}_char1`}
          onChange={handleInput}
          value={code.slice(1, 2).join('')}
          disabled={disabled}
          className={`w-[calc(1ch+1.5rem+2px)] rounded-md px-3 py-1.5 text-center outline-0 focus:ring-1 focus-visible:ring-text-primary/50 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary focus:bg-surface-secondary-contrast'}`}
        />
        <input
          type="text"
          name={`${name}_char2`}
          onChange={handleInput}
          value={code.slice(2, 3).join('')}
          disabled={disabled}
          className={`w-[calc(1ch+1.5rem+2px)] rounded-md px-3 py-1.5 text-center outline-0 focus:ring-1 focus-visible:ring-text-primary/50 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary focus:bg-surface-secondary-contrast'}`}
        />
        <input
          type="text"
          name={`${name}_char3`}
          onChange={handleInput}
          value={code.slice(3, 4).join('')}
          disabled={disabled}
          className={`w-[calc(1ch+1.5rem+2px)] rounded-md px-3 py-1.5 text-center outline-0 focus:ring-1 focus-visible:ring-text-primary/50 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary focus:bg-surface-secondary-contrast'}`}
        />
        <input
          type="text"
          name={`${name}_char4`}
          onChange={handleInput}
          value={code.slice(4, 5).join('')}
          disabled={disabled}
          className={`w-[calc(1ch+1.5rem+2px)] rounded-md px-3 py-1.5 text-center outline-0 focus:ring-1 focus-visible:ring-text-primary/50 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary focus:bg-surface-secondary-contrast'}`}
        />
        <input
          type="text"
          name={`${name}_char5`}
          onChange={handleInput}
          value={code.slice(5, 6).join('')}
          disabled={disabled}
          className={`w-[calc(1ch+1.5rem+2px)] rounded-md px-3 py-1.5 text-center outline-0 focus:ring-1 focus-visible:ring-text-primary/50 ${error ? 'bg-surface-danger/10' : 'bg-surface-secondary focus:bg-surface-secondary-contrast'}`}
        />
        <input type="hidden" name={name} value={code.join('')} />
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

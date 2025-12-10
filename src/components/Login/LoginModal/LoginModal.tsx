import React, { useState, useRef } from 'react'

import { useSearch } from '@tanstack/react-router'

import { useAuth } from '@/context/Auth'
import { Modal } from '@/components/Core/Modal'
import { Input } from '@/components/Core/Input'
import { InputCode } from '@/components/Core/InputCode'
import { Button } from '@/components/Core/Button'

import { AlertCircle } from 'react-feather'

import type { UpdateSessionError } from '@/api/updateSession'
import type { CreateSessionError, CreateSessionSuccess } from '@/api/createSession'

export interface LoginModalProps {
  className?: string
}

export const LoginModal: React.FC<LoginModalProps> = ({ className = '' }) => {
  const search = useSearch({ strict: false }) as { [key: string]: string }

  const [loginStep, setLoginStep] = useState('email')
  const { isAuthenticated, loginEmail, loginCode } = useAuth()

  const [formError, setFormError] = useState('')
  const [inputEmailError, setInputEmailError] = useState('')
  const [inputCodeError, setInputCodeError] = useState('')
  const sessionUUID = useRef('')

  if (!search.modal || search.modal !== 'login' || isAuthenticated()) {
    return
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, close: () => void) => {
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    if (loginStep === 'email') {
      if (!formJson.email_address) {
        setInputEmailError("can't be empty")
        return
      } else {
        setInputEmailError('')
      }

      const loginEmailApi = await loginEmail(formJson.email_address as string)

      if (loginEmailApi.success) {
        sessionUUID.current = (loginEmailApi as CreateSessionSuccess).sessionData.uuid
        setLoginStep('code')
      }

      if (!loginEmailApi.success) {
        if (
          (loginEmailApi as CreateSessionError).errors.email_address &&
          (loginEmailApi as CreateSessionError).errors.email_address.length > 0
        ) {
          setInputEmailError((loginEmailApi as CreateSessionError).errors.email_address[0])
        } else {
          setInputEmailError('')
        }

        if ((loginEmailApi as CreateSessionError).message) {
          setFormError((loginEmailApi as CreateSessionError).message)
        } else {
          setFormError('')
        }
      }
    }

    if (loginStep === 'code') {
      if (!formJson.code) {
        setInputCodeError("can't be empty")
        return
      } else {
        setInputCodeError('')
      }

      if ((formJson.code as string).length < 6) {
        setInputCodeError('is too short')
        return
      } else {
        setInputCodeError('')
      }

      const loginCodeApi = await loginCode(sessionUUID.current, formJson.code as string)

      if (loginCodeApi.success) {
        close()
        return
      }

      if (!loginCodeApi.success) {
        if (
          (loginCodeApi as UpdateSessionError).errors.code &&
          (loginCodeApi as UpdateSessionError).errors.code.length > 0
        ) {
          setInputCodeError((loginCodeApi as UpdateSessionError).errors.code[0])
        } else {
          setInputCodeError('')
        }

        if ((loginCodeApi as UpdateSessionError).message) {
          setFormError((loginCodeApi as UpdateSessionError).message)
        } else {
          setFormError('')
        }
      }
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, code: (string | undefined)[]) => {
    if (code.join('').length === 6) {
      setTimeout(() => (e.target.form as HTMLFormElement).requestSubmit(), 1)
    }
  }

  return (
    <>
      <Modal title="Login to continue" onSave={handleSave} closePath="." showButtons={false} className={className}>
        {loginStep === 'email' && (
          <>
            <Input label="Email Adsress" name="email_address" type="email" error={inputEmailError} />
            <div className="flex w-full flex-col items-start gap-2">
              <Button type="submit">Continue</Button>
              {formError && (
                <p className="flex items-center gap-1 text-xs text-surface-danger">
                  <AlertCircle width="1em" height="1em" />
                  <span>{formError}</span>
                </p>
              )}
            </div>
          </>
        )}
        {loginStep === 'code' && (
          <>
            <InputCode label="Code" name="code" error={inputCodeError} onChange={handleCodeChange} />
            <div className="flex w-full flex-col items-start gap-2">
              <Button type="submit">Login</Button>
              {formError && (
                <p className="flex items-center gap-1 text-xs text-surface-danger">
                  <AlertCircle width="1em" height="1em" />
                  <span>{formError}</span>
                </p>
              )}
            </div>
          </>
        )}
      </Modal>
      <pre>{JSON.stringify(search, null, '')}</pre>
    </>
  )
}

import React, { useState } from 'react'

import { useNavigate, useSearch } from '@tanstack/react-router'

import { useAuth } from '@/context/Auth'
import { Modal } from '@/components/Core/Modal'
import { Input } from '@/components/Core/Input'
import { Button } from '@/components/Core/Button'

import { AlertCircle } from 'react-feather'

import { updateUser, type UpdateUserSuccess, type UpdateUserError } from '@/api/updateUser'
import { deleteUser, type DeleteUserError } from '@/api/deleteUser'

export interface AccountSettingsModalProps {
  className?: string
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ className = '' }) => {
  const search = useSearch({ strict: false }) as { [key: string]: string }
  const navigate = useNavigate()

  const { isAuthenticated, user, updateUser: updateUserState, logout } = useAuth()

  const [formError, setFormError] = useState('')
  const [inputEmailError, setInputEmailError] = useState('')
  const [inputNameError, setInputNameError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  if (!search.modal || search.modal !== 'account-settings' || !isAuthenticated()) {
    return
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>, close: () => void) => {
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    if (!formJson.email_address) {
      setInputEmailError("can't be empty")
      return
    } else {
      setInputEmailError('')
    }

    if (!formJson.name) {
      setInputNameError("can't be empty")
      return
    } else {
      setInputNameError('')
    }

    const api = await updateUser(formJson.email_address as string, formJson.name as string)

    if (api.success) {
      if (
        updateUserState((api as UpdateUserSuccess).userData.name, (api as UpdateUserSuccess).userData.email_address)
      ) {
        close()
      } else {
        setFormError('Unknown error, changes may or may not have been saved')
      }
    }

    if (!api.success) {
      if ((api as UpdateUserError).errors.email_address && (api as UpdateUserError).errors.email_address.length > 0) {
        setInputEmailError((api as UpdateUserError).errors.email_address[0])
      } else {
        setInputEmailError('')
      }

      if ((api as UpdateUserError).errors.name && (api as UpdateUserError).errors.name.length > 0) {
        setInputNameError((api as UpdateUserError).errors.name[0])
      } else {
        setInputNameError('')
      }

      if (
        Object.keys((api as UpdateUserError).errors).length < 1 &&
        (api as UpdateUserError).message &&
        (api as UpdateUserError).message.length > 0
      ) {
        setFormError((api as UpdateUserError).message)
      } else {
        setFormError('')
      }
    }
  }

  const handleClose = () => {
    setInputEmailError('')
    setInputNameError('')
    setFormError('')
    setDeleteError('')
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account and all it's data?")) {
      const api = await deleteUser()

      if (api.success) {
        localStorage.removeItem('session-uuid')
        logout()
        navigate({ to: '/' })
        return
      }

      if (!api.success) {
        if ((api as DeleteUserError).message && (api as DeleteUserError).message.length > 0) {
          setDeleteError((api as DeleteUserError).message)
        } else {
          setDeleteError('')
        }
      }
    }
  }

  return (
    <Modal title="Edit Account" onSave={handleSave} onClose={handleClose} closePath="." className={className}>
      <Input label="Name" name="name" defaultValue={user?.name} error={inputNameError} />
      <Input
        label="Email Address"
        name="email_address"
        type="email"
        defaultValue={user?.email_address}
        error={inputEmailError}
      />
      <div>
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Account</span>
          <Button variant="wire-danger" size="medium" onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
        {deleteError && (
          <p className="flex items-center gap-1 text-xs text-surface-danger">
            <AlertCircle width="1em" height="1em" />
            <span>{deleteError}</span>
          </p>
        )}
      </div>
      {formError && (
        <p className="flex items-center gap-1 text-xs text-surface-danger">
          <AlertCircle width="1em" height="1em" />
          <span>{formError}</span>
        </p>
      )}
    </Modal>
  )
}

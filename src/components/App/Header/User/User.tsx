import React, { useEffect, useState, useRef } from 'react'

import { Link, useNavigate } from '@tanstack/react-router'
import { createAvatar } from '@dicebear/core'
import { notionistsNeutral } from '@dicebear/collection'
import { useAuth } from '@/context/Auth'
import { User as UserIcon } from 'react-feather'

export interface UserProps {
  className?: string
}

export const User: React.FC<UserProps> = ({ className = '' }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const userRef = useRef(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userRef.current) {
        const userElem = userRef.current as HTMLElement
        if (!userElem.contains(e.target as HTMLElement)) {
          setIsNavOpen(false)
        }
      }
    }

    const handleBlur = (e: FocusEvent) => {
      if (userRef.current) {
        const userElem = userRef.current as HTMLElement
        if (!userElem.contains(e.relatedTarget as HTMLElement)) {
          setIsNavOpen(false)
        }
      }
    }

    if (isNavOpen) {
      if (userRef.current) {
        window.addEventListener('click', handleClick)
        ;(userRef.current as HTMLElement).addEventListener('blur', handleBlur, true)
      }

      return () => {
        if (userRef.current) {
          window.removeEventListener('click', handleClick)
          ;(userRef.current as HTMLElement).removeEventListener('blur', handleBlur, true)
        }
      }
    }
  }, [isNavOpen, userRef])

  if (!isAuthenticated()) {
    return (
      <Link
        to="."
        search={{
          modal: 'login',
        }}
        className="flex h-12 w-12 items-center justify-center rounded-md bg-text-primary-inverted/20 focus-visible:ring-1 focus-visible:ring-text-primary-inverted focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary-inverted focus-visible:outline-none"
        tabIndex={0}
        mask={{
          to: '/login',
        }}
      >
        <UserIcon height="1em" width="1em" className="text-2xl text-text-primary-inverted" />
        <span className="sr-only">Login</span>
      </Link>
    )
  }

  return (
    <div ref={userRef} className={`relative text-[0px] ${className}`}>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="h-12 w-12 rounded-md focus-visible:ring-1 focus-visible:ring-text-primary-inverted focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary-inverted focus-visible:outline-none"
      >
        {user !== null && user.picture ? (
          <img src={user.picture} alt="" className="h-full w-full rounded-md object-cover" />
        ) : (
          <div
            className="pointer-events-none h-full w-full overflow-hidden rounded-md bg-primary-300 object-cover"
            dangerouslySetInnerHTML={{
              __html: createAvatar(notionistsNeutral, {
                seed: user?.email_address,
                flip: true,
                backgroundColor: ['transparent'],
              }).toString(),
            }}
          ></div>
        )}
      </button>
      <nav
        className={`${isNavOpen ? 'block' : 'hidden'} absolute top-[calc(100%+.5rem)] right-0 transform-gpu rounded-md bg-surface-primary text-base drop-shadow-[0_0_6px] drop-shadow-surface-primary-inverted/20`}
      >
        <ul className="flex flex-col">
          <li className="flex flex-col p-4 whitespace-nowrap not-last:border-b not-last:border-b-surface-secondary-contrast">
            {user?.name}
            <span className="text-xs text-text-secondary-contrast">{user?.email_address}</span>
          </li>
          <li className="p-1 not-last:border-b not-last:border-b-surface-secondary-contrast">
            <Link
              to="/"
              tabIndex={0}
              className="block rounded-md p-3 whitespace-nowrap outline-0 hover:bg-surface-secondary focus-visible:bg-surface-secondary focus-visible:ring-1 focus-visible:ring-text-primary"
            >
              Account Settings
            </Link>
          </li>
          <li className="p-1 not-last:border-b not-last:border-b-surface-secondary-contrast">
            <button
              type="button"
              onClick={async () => {
                const loggedout = await logout()
                if (loggedout) {
                  navigate({
                    to: '.',
                  })
                }
              }}
              className="block w-full cursor-pointer rounded-md p-3 text-left text-surface-danger outline-0 hover:bg-surface-danger/5 focus-visible:bg-surface-danger/5 focus-visible:ring-1 focus-visible:ring-surface-danger"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

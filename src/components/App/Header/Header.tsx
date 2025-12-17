import React from 'react'

import { Link } from '@tanstack/react-router'

import { useAuth } from '@/context/Auth'
import { useApp } from '@/context/App'
import { LinkButton } from '@/components/Core/LinkButton'
import { User } from '@/components/App/Header/User'

import logo from '@/assets/svgs/quickcue.svg'
import icon from '@/assets/svgs/quickcue-icon.svg'

export interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const {
    header: { showDashboardButton },
  } = useApp()

  const { isAuthenticated } = useAuth()

  return (
    <header className={`flex items-center justify-between px-6 py-4 ${className}`}>
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src={logo} alt="QuickCue Logo" className="hidden h-8 md:block" />
          <img src={icon} alt="QuickCue Logo" className="h-10 md:hidden" />
        </Link>
        {showDashboardButton && isAuthenticated() && (
          <LinkButton to="/" variant="translucent" icon="back">
            Dashboard
          </LinkButton>
        )}
      </div>
      <User />
    </header>
  )
}

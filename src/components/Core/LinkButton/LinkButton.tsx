import React from 'react'

import tw from '@utils/tw'
import { PlusSquare, Edit, Share, Trash, ArrowLeft } from 'react-feather'
import { Link } from '@tanstack/react-router'

export interface LinkButtonProps {
  variant?: 'primary' | 'secondary' | 'translucent' | 'danger' | 'wire' | 'wire-danger'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  to: string
  search?: any
  mask?: any
  params?: any
  disabled?: boolean
  className?: string
  icon?: 'new' | 'edit' | 'share' | 'trash' | 'back' | 'none'
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'primary',
  size = 'large',
  children,
  to,
  search,
  mask,
  params,
  disabled = false,
  className = '',
  icon = 'none',
}) => {
  const baseStyles = tw`inline-flex items-center gap-2 font-medium transition-colors focus:ring-2 focus:ring-text-primary focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`

  const variantStyles = {
    primary: tw`bg-surface-brand text-text-brand not-disabled:hover:bg-surface-brand-contrast not-disabled:hover:text-text-brand-contrast`,
    secondary: tw`bg-surface-secondary text-text-secondary not-disabled:hover:bg-surface-secondary-contrast not-disabled:hover:text-text-secondary`,
    translucent: tw`bg-surface-secondary/20 text-text-primary-inverted not-disabled:hover:bg-surface-secondary/30 focus:ring-text-primary-inverted focus:ring-offset-black`,
    danger: tw`bg-surface-danger text-text-danger not-disabled:hover:bg-surface-danger-contrast not-disabled:hover:text-text-danger-contrast focus:ring-red-500`,
    wire: tw`border border-text-secondary text-text-secondary not-disabled:hover:bg-surface-secondary`,
    'wire-danger': tw`border border-text-secondary text-text-secondary not-disabled:hover:border-surface-danger-contrast not-disabled:hover:bg-surface-danger-contrast not-disabled:hover:text-text-danger-contrast`,
  }

  const sizeStyles = {
    small: tw`rounded-md px-3 py-1 text-xs`,
    medium: tw`rounded-md px-4.5 py-1.5 text-sm`,
    large: tw`rounded-lg px-6 py-2 text-base`,
  }

  const iconElements = {
    new: <PlusSquare height="1.4em" width="1.4em" />,
    edit: <Edit height="1.4em" width="1.4em" />,
    share: <Share height="1.4em" width="1.4em" />,
    trash: <Trash height="1.4em" width="1.4em" />,
    back: <ArrowLeft height="1.4em" width="1.4em" />,
    none: null,
  }

  return (
    <Link
      to={to}
      search={search}
      mask={mask}
      params={params}
      tabIndex={0}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {iconElements[icon]}
      {children}
    </Link>
  )
}

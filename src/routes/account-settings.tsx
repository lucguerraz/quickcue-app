import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/account-settings')({
  loader: () => {
    redirect({
      to: '/',
      search: {
        modal: 'account-settings',
      },
      mask: {
        to: '/account-settings',
      },
      throw: true,
    })
  },
})

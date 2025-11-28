import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  loader: ({ context }) => {
    if (context.auth.isAuthenticated()) {
      redirect({
        to: '/',
        throw: true,
      })
    }

    redirect({
      to: '/',
      search: {
        modal: 'login',
      },
      mask: {
        to: '/login',
      },
      throw: true,
    })
  },
})

import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { useAuth } from '@/context/Auth'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, search }) => {
    const searchParams = search as { modal?: string }
    if (!context.auth.isAuthenticated() && searchParams.modal !== 'login') {
      redirect({
        to: '.',
        search: {
          modal: 'login',
          redirect: location.href,
        },
        mask: {
          to: '/login',
        },
        throw: true,
      })
    }
  },
  component: App,
})

function App() {
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth.isAuthenticated()) return <p>Please Login</p>

  return (
    <>
      <h1 className="text-center">
        Welcome back {auth.user?.name} ({auth.user?.email_address})!
      </h1>
      <button
        onClick={() => {
          auth.logout()
          navigate({
            to: '.',
            search: {
              modal: 'login',
              redirect: location.href,
            },
            mask: {
              to: '/login',
            },
          })
        }}
      >
        Logout
      </button>
    </>
  )
}

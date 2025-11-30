import { createFileRoute, redirect, useNavigate, Link } from '@tanstack/react-router'

import { useAuth } from '@/context/Auth'
import { useApp } from '@/context/App'

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
  const {
    header: { setShowDashboardButton },
  } = useApp()

  setShowDashboardButton(false)

  if (!auth.isAuthenticated()) return <p>Please Login</p>

  return (
    <>
      <h1 className="text-center">
        Welcome back {auth.user?.name} ({auth.user?.email_address})!
      </h1>
      <Link to="/video/$videoUUID" params={{ videoUUID: 'uuid' }}>
        video
      </Link>
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

import React, { createContext, useContext, useState } from 'react'

export interface AppState {
  header: {
    showDashboardButton: boolean
    setShowDashboardButton: (value: boolean) => void
  }
  toast: {
    stack: toastStack
    setStack: (value: toastStack) => void
  }
}

type toastStack = {
  [key: string]: {
    id: string
    status: 'error' | 'success' | 'warning' | undefined
    message: string
    detail?: string
    trigger: string
  }
}

export const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showDashboardButton, setShowDashboardButton] = useState(false)
  const [toastStack, setToastStack] = useState<toastStack>({})

  return (
    <AppContext
      value={{
        header: { showDashboardButton, setShowDashboardButton },
        toast: { stack: toastStack, setStack: setToastStack },
      }}
    >
      {children}
    </AppContext>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

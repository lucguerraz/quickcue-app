import React, { createContext, useContext, useState } from 'react'

export interface AppState {
  header: {
    showDashboardButton: boolean
    setShowDashboardButton: (value: boolean) => void
  }
}

export const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showDashboardButton, setShowDashboardButton] = useState(false)

  return <AppContext value={{ header: { showDashboardButton, setShowDashboardButton } }}>{children}</AppContext>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

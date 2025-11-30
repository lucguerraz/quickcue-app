import type { Meta, StoryObj } from '@storybook/react-vite'

import { Header } from './Header'
import { withReactContext } from 'storybook-react-context'
import { AuthContext } from '@/context/Auth'
import { AppContext } from '@/context/App'

const meta = {
  title: 'App/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
  globals: {
    backgrounds: { value: 'dark' },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const NotLoggedIn: Story = {
  args: {},
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: { isAuthenticated: () => false },
    }),
    withReactContext({
      context: AppContext,
      contextValue: { header: { showDashboardButton: false } },
    }),
  ],
}

export const loggedIn: Story = {
  args: {},
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: {
        isAuthenticated: () => true,
        user: { name: 'Marcus Laine', email_address: 'marcus.laine@example.com' },
      },
    }),
    withReactContext({
      context: AppContext,
      contextValue: { header: { showDashboardButton: false } },
    }),
  ],
}

export const loggedInWithDashboardButton: Story = {
  args: {},
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: {
        isAuthenticated: () => true,
        logout: async () => true,
        user: { name: 'Marcus Laine', email_address: 'marcus.laine@example.com' },
      },
    }),
    withReactContext({
      context: AppContext,
      contextValue: { header: { showDashboardButton: true } },
    }),
  ],
}

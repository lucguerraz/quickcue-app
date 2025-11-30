import type { Meta, StoryObj } from '@storybook/react-vite'

import { User } from './User'
import { withReactContext } from 'storybook-react-context'
import { AuthContext, type User as UserType } from '@/context/Auth'

const meta = {
  title: 'App/Header/User',
  component: User,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof User>

export default meta
type Story = StoryObj<typeof meta>

export const notLoggedIn: Story = {
  args: {},
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: { isAuthenticated: () => false },
    }),
  ],
  globals: {
    backgrounds: { value: 'dark' },
  },
}

export const loggedIn: Story = {
  args: {
    name: 'Marcus Laine',
    email_address: 'marcus.laine@example.com',
    picture: 'https://images.unsplash.com/photo-1636087318279-c10c854f7f62?q=80&w=200&auto=format&fit=crop',
  } as any,
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: ({ args }: { args: UserType }) => {
        return {
          isAuthenticated: () => true,
          logout: async () => true,
          user: {
            name: args.name,
            email_address: args.email_address,
            picture: args.picture,
          },
        }
      },
    }),
  ],
  globals: {
    backgrounds: { value: 'dark' },
  },
}

export const loggedInOnWhite: Story = {
  args: {
    name: 'Marcus Laine',
    email_address: 'marcus.laine@example.com',
    picture: 'https://images.unsplash.com/photo-1636087318279-c10c854f7f62?q=80&w=200&auto=format&fit=crop',
  } as any,
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: ({ args }: { args: UserType }) => {
        return {
          isAuthenticated: () => true,
          logout: async () => true,
          user: {
            name: args.name,
            email_address: args.email_address,
            picture: args.picture,
          },
        }
      },
    }),
  ],
  globals: {
    backgrounds: { value: 'light' },
  },
}

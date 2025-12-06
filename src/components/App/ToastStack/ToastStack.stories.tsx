import type { Meta, StoryObj } from '@storybook/react-vite'

import { ToastStack } from './ToastStack'
import { withReactContext } from 'storybook-react-context'
import { AppContext } from '@/context/App'

const meta = {
  title: 'App/ToastStack',
  component: ToastStack,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ToastStack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  decorators: [
    withReactContext({
      context: AppContext,
      contextValue: {
        toast: {
          stack: {
            myid: {
              id: 'myid',
              status: 'error',
              message: "Sorry, action couldn't be preformed",
              detail: 'Permission denied',
              trigger: 'myid',
            },
            myid2: {
              id: 'myid2',
              status: 'success',
              message: 'Action preformed',
              trigger: 'myid',
            },
          },
          setStack: (value: any) => {
            return
          },
        },
      },
    }),
  ],
}

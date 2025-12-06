import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Toast } from './Toast'

const meta = {
  title: 'Core/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { dismount: fn() },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    id: '01421671-ba81-41a7-9f02-7bf8af95e05c',
    variant: 'error',
    message: "Sorry, couldn't perform that action",
    detail: 'Unkown server error',
    trigger: 'myid',
  },
}

export const Warning: Story = {
  args: {
    id: '01421671-ba81-41a7-9f02-7bf8af95e05c',
    variant: 'warning',
    message: "Action wasn't completed",
    detail: 'Action might have unintended results',
    trigger: 'myid',
  },
}

export const Success: Story = {
  args: {
    id: '01421671-ba81-41a7-9f02-7bf8af95e05c',
    variant: 'success',
    message: 'Action successfully completed',
    detail: 'Item was moved',
    trigger: 'myid',
  },
}

export const WithoutDetail: Story = {
  args: {
    id: '01421671-ba81-41a7-9f02-7bf8af95e05c',
    variant: 'success',
    message: 'Action successfully completed',
    trigger: 'myid',
  },
}

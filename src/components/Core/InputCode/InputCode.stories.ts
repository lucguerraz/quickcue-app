import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { InputCode } from './InputCode'

const meta = {
  title: 'Core/InputCode',
  component: InputCode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof InputCode>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Code',
    name: 'code',
  },
}

export const WithError: Story = {
  args: {
    label: 'Code',
    name: 'code',
    defaultValue: '123456',
    error: 'is expired',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Code',
    name: 'code',
    disabled: true,
  },
}

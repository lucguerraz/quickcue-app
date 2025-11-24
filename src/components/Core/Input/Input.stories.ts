import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Input } from './Input'

const meta = {
  title: 'Core/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    label: 'Username',
    name: 'username',
    value: 'myusername',
  },
  globals: {
    maxWidth: '600px',
    minWidth: '400px',
  },
}

export const Email: Story = {
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    value: 'spongebob@example.com',
  },
  globals: {
    maxWidth: '600px',
    minWidth: '400px',
  },
}

export const WithError: Story = {
  args: {
    label: 'Username',
    name: 'username',
    value: 'my-user-name',
    error: 'may not contain dashes',
  },
  globals: {
    maxWidth: '600px',
    minWidth: '400px',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Username',
    name: 'username',
    value: 'myusername',
    disabled: true,
  },
  globals: {
    maxWidth: '600px',
    minWidth: '400px',
  },
}

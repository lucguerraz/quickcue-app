import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { InputFile } from './InputFile'

const meta = {
  title: 'Core/InputFile',
  component: InputFile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof InputFile>

export default meta
type Story = StoryObj<typeof meta>

export const Deafult: Story = {
  args: {
    label: 'Profile Picture',
    name: 'profilepicture',
    value: 'https://images.unsplash.com/photo-1650091903034-5f3bb37c35d2?q=80&w=200&auto=format&fit=crop',
  },
  globals: {
    maxWidth: '800px',
    minWidth: '400px',
  },
}

export const Empty: Story = {
  args: {
    label: 'Profile Picture',
    name: 'profilepicture',
    value: '',
  },
  globals: {
    maxWidth: '800px',
    minWidth: '400px',
  },
}

export const WithError: Story = {
  args: {
    label: 'Profile Picture',
    name: 'profilepicture',
    value: '',
    error: 'must not be empty',
  },
  globals: {
    maxWidth: '800px',
    minWidth: '400px',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Profile Picture',
    name: 'profilepicture',
    value: 'https://images.unsplash.com/photo-1650091903034-5f3bb37c35d2?q=80&w=200&auto=format&fit=crop',
    disabled: true,
  },
  globals: {
    maxWidth: '800px',
    minWidth: '400px',
  },
}

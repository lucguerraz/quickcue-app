import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { NewComment } from './NewComment'

const meta = {
  title: 'Video/Comments/NewComment',
  component: NewComment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onSubmit: fn(), videoEventTarget: new EventTarget() },
} satisfies Meta<typeof NewComment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    videoTimecode: 12,
    videoLength: 60,
  },
  globals: {
    minWidth: '400px',
    maxWidth: '600px',
  },
}

export const Error: Story = {
  args: {
    videoTimecode: 12,
    videoLength: 60,
    errors: {
      message: "can't be empty",
      timestamp_start: "can't be smaller that 0",
      timestamp_end: "can't be bigger that 60",
      form: 'Network error, please try again later',
    },
  },
  globals: {
    minWidth: '400px',
    maxWidth: '600px',
  },
}

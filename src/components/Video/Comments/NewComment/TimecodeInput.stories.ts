import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { TimecodeInput } from './TimecodeInput'

const meta = {
  title: 'Video/Comments/TimecodeInput',
  component: TimecodeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof TimecodeInput>

export default meta
type Story = StoryObj<typeof meta>

export const StartTimecode: Story = {
  args: {
    name: 'startTimecode',
    value: 65,
    min: 0,
    absoluteMin: 0,
    max: 65,
    absoluteMax: 179,
  },
}

export const EndTimecode: Story = {
  args: {
    name: 'endTimecode',
    value: 66,
    min: 66,
    absoluteMin: 1,
    max: 180,
    absoluteMax: 180,
  },
}

export const Error: Story = {
  args: {
    name: 'startTimecode',
    value: 65,
    min: 0,
    absoluteMin: 0,
    max: 65,
    absoluteMax: 179,
    error: true,
  },
}

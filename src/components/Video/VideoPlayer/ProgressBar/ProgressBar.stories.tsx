import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Video/VideoPlayer/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    playPause: fn(),
    seekTo: fn(),
    className: 'relative',
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playing: Story = {
  args: {
    timecode: 6.3,
    duration: 15,
    isPlaying: true,
    isBuffering: false,
  },
}

export const Paused: Story = {
  args: {
    timecode: 6.3,
    duration: 15,
    isPlaying: false,
    isBuffering: false,
  },
}

export const Buffering: Story = {
  args: {
    timecode: 6.3,
    duration: 15,
    isPlaying: true,
    isBuffering: true,
  },
}

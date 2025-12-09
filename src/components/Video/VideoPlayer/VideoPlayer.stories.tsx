import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { VideoPlayer } from './VideoPlayer'

const meta = {
  title: 'Video/VideoPlayer/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    setVideoLength: fn(),
    setVideoTimecode: fn(),
  },
} satisfies Meta<typeof VideoPlayer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    videoUrl: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
  },
}

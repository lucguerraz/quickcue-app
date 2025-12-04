import type { Meta, StoryObj } from '@storybook/react-vite'

import { VideoTeaserSkeleton } from './VideoTeaserSkeleton'

const meta = {
  title: 'Dashboard/VideoTeaser/VideoTeaserSkeleton',
  component: VideoTeaserSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof VideoTeaserSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  globals: {
    minWidth: '600px',
    maxWidth: '600px',
  },
}

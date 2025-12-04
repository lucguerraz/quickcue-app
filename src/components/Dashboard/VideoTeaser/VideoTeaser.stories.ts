import type { Meta, StoryObj } from '@storybook/react-vite'

import { VideoTeaser } from './VideoTeaser'

const meta = {
  title: 'Dashboard/VideoTeaser',
  component: VideoTeaser,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof VideoTeaser>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    uuid: 'e3ba6527-26fd-4106-9055-94b321184f6c',
    poster: 'https://images.unsplash.com/photo-1763411711221-40166c5e20cd?q=80&w=1000&auto=format&fit=crop',
    title: 'Video number 1',
    commentCount: 3,
    lastModified: '2025-11-18T09:19:39.179',
  },
  globals: {
    maxWidth: '600px',
  },
}

export const LongTitle: Story = {
  args: {
    uuid: 'e3ba6527-26fd-4106-9055-94b321184f6c',
    poster: 'https://images.unsplash.com/photo-1763411711221-40166c5e20cd?q=80&w=1000&auto=format&fit=crop',
    title: 'ProjectName_VideoName_Language_ClientCompany_DayMonthYear_VersionNumber',
    commentCount: 3,
    lastModified: '2025-11-18T09:19:39.179',
  },
  globals: {
    maxWidth: '600px',
  },
}

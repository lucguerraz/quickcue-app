import type { Meta, StoryObj } from '@storybook/react-vite'

import { VideoTeaserUploading } from './VideoTeaserUploading'

const meta = {
  title: 'Dashboard/VideoTeaser/VideoTeaserUploading',
  component: VideoTeaserUploading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof VideoTeaserUploading>

export default meta
type Story = StoryObj<typeof meta>

export const Uploading: Story = {
  args: {
    uuid: 'e269f9f1-5f4d-4479-a365-11935d909100',
    title: 'My Video',
    status: 'uploading',
    progress: 23,
  },
  globals: {
    minWidth: '600px',
    maxWidth: '600px',
  },
}

export const Processing: Story = {
  args: {
    uuid: 'e269f9f1-5f4d-4479-a365-11935d909100',
    title: 'My Video',
    status: 'processing',
    progress: 85,
  },
  globals: {
    minWidth: '600px',
    maxWidth: '600px',
  },
}

export const Complete: Story = {
  args: {
    uuid: 'e269f9f1-5f4d-4479-a365-11935d909100',
    title: 'My Video',
    poster: 'https://images.unsplash.com/photo-1763411711221-40166c5e20cd?q=80&w=1000&auto=format&fit=crop',
    status: 'done',
  },
  globals: {
    minWidth: '600px',
    maxWidth: '600px',
  },
}

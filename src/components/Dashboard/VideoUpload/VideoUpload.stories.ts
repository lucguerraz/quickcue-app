import type { Meta, StoryObj } from '@storybook/react-vite'

import { VideoUpload } from './VideoUpload'

const meta = {
  title: 'Dashboard/VideoUpload',
  component: VideoUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof VideoUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

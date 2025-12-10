import type { Meta, StoryObj } from '@storybook/react-vite'

import { Comment } from './Comment'

const meta = {
  title: 'Video/Comments/Comment',
  component: Comment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Comment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    uuid: '4565f9d3-4cba-49b5-ac51-e7335535b1a5',
    useruuid: '96247793-e9dc-47f1-a635-dc50c378ed21',
    userpic: 'https://images.unsplash.com/photo-1650091903034-5f3bb37c35d2?q=80&w=200&auto=format&fit=crop',
    username: 'Barbara Flint',
    lastModified: '2025-11-18T09:19:39.179',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  globals: {
    maxWidth: '600px',
  },
}

export const NoUserPicture: Story = {
  args: {
    uuid: '4565f9d3-4cba-49b5-ac51-e7335535b1a5',
    useruuid: '96247793-e9dc-47f1-a635-dc50c378ed21',
    userpic: null,
    username: 'Barbara Flint',
    lastModified: '2025-11-18T09:19:39.179',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  globals: {
    maxWidth: '600px',
  },
}

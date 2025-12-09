import type { Meta, StoryObj } from '@storybook/react-vite'

import { CommentsBar } from './CommentsBar'

const meta = {
  title: 'Video/VideoPlayer/CommentsBar',
  component: CommentsBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {},
  globals: {
    backgrounds: { value: 'dark' },
  },
} satisfies Meta<typeof CommentsBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playing: Story = {
  args: {
    timecode: 6.3,
    duration: 60,
    comments: [
      {
        uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        message: 'Love the cinematography',
        timestamp_start: 0,
        timestamp_end: 12,
        updated_at: '2025-11-18T09:05:57.803Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210',
        message: 'This scene is perfect',
        timestamp_start: 23,
        timestamp_end: 35,
        updated_at: '2025-11-18T09:12:34.567Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '12345678-90ab-cdef-1234-567890abcdef12',
        message: 'Amazing editing skills',
        timestamp_start: 45,
        timestamp_end: 52,
        updated_at: '2025-11-18T09:18:45.678Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '23456789-0abc-def1-2345-67890abcdef123',
        message: 'The sound design is incredible',
        timestamp_start: 18,
        timestamp_end: 27,
        updated_at: '2025-11-18T09:23:12.345Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '34567890-abcd-ef12-3456-7890abcdef1234',
        message: 'Great character development',
        timestamp_start: 3,
        timestamp_end: 8,
        updated_at: '2025-11-18T09:27:56.789Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '4567890a-bcde-f123-4567-890abcdef12345',
        message: 'This is my favorite part',
        timestamp_start: 55,
        timestamp_end: 60,
        updated_at: '2025-11-18T09:31:23.456Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '567890ab-cdef-1234-5678-90abcdef123456',
        message: 'The lighting is fantastic',
        timestamp_start: 12,
        timestamp_end: 19,
        updated_at: '2025-11-18T09:35:45.678Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '67890abc-def1-2345-6789-0abcdef1234567',
        message: 'What a twist!',
        timestamp_start: 32,
        timestamp_end: 32,
        updated_at: '2025-11-18T09:39:12.345Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '7890abcd-ef12-3456-7890-abcdef12345678',
        message: 'Brilliant directing',
        timestamp_start: 7,
        timestamp_end: 14,
        updated_at: '2025-11-18T09:42:34.567Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
      {
        uuid: '890abcdef1-2345-6789-0abc-def1234567890',
        message: 'The ending was perfect',
        timestamp_start: 42,
        timestamp_end: 60,
        updated_at: '2025-11-18T09:46:56.789Z',
        user: { uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d', name: 'User1', picture: null },
      },
    ],
  },
}

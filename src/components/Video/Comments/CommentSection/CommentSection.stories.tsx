import type { Meta, StoryObj } from '@storybook/react-vite'
import { http, HttpResponse, delay } from 'msw'
import { withReactContext } from 'storybook-react-context'

import { CommentSection } from './CommentSection'
import { AuthContext } from '@/context/Auth'

const meta = {
  title: 'Video/Comments/CommentSection',
  component: CommentSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    reload: async () => {
      await new Promise((res) => setTimeout(res, 10000))
      return true
    },
    videoEventTarget: new EventTarget(),
  },
} satisfies Meta<typeof CommentSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    videoUUID: '324bced6-4e7f-4e96-b74b-f0bbdd595868',
    videoTimecode: 20,
    videoLength: 60,
    comments: [
      {
        uuid: 'a1e2d3c4-5f6b-7a8c-9d0e-1f2a3b4c5d6e',
        message: 'Comment 1',
        timestamp_start: 0,
        timestamp_end: 100,
        updated_at: '2025-12-07T12:00:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7f',
        message: 'Comment 2',
        timestamp_start: 45,
        timestamp_end: 145,
        updated_at: '2025-12-07T12:01:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8a',
        message: 'Comment 3',
        timestamp_start: 90,
        timestamp_end: 190,
        updated_at: '2025-12-07T12:02:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'd4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9b',
        message: 'Comment 4',
        timestamp_start: 135,
        timestamp_end: 235,
        updated_at: '2025-12-07T12:03:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0c',
        message: 'Comment 5',
        timestamp_start: 180,
        timestamp_end: 280,
        updated_at: '2025-12-07T12:04:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1d',
        message: 'Comment 6',
        timestamp_start: 225,
        timestamp_end: 325,
        updated_at: '2025-12-07T12:05:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2e',
        message: 'Comment 7',
        timestamp_start: 270,
        timestamp_end: 370,
        updated_at: '2025-12-07T12:06:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3f',
        message: 'Comment 8',
        timestamp_start: 315,
        timestamp_end: 415,
        updated_at: '2025-12-07T12:07:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4g',
        message: 'Comment 9',
        timestamp_start: 360,
        timestamp_end: 460,
        updated_at: '2025-12-07T12:08:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'd0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5h',
        message: 'Comment 10',
        timestamp_start: 405,
        timestamp_end: 505,
        updated_at: '2025-12-07T12:09:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6i',
        message: 'Comment 11',
        timestamp_start: 450,
        timestamp_end: 550,
        updated_at: '2025-12-07T12:10:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7j',
        message: 'Comment 12',
        timestamp_start: 495,
        timestamp_end: 595,
        updated_at: '2025-12-07T12:11:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8k',
        message: 'Comment 13',
        timestamp_start: 540,
        timestamp_end: 600,
        updated_at: '2025-12-07T12:12:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'b4c5d6e7-8f9a-0b1c-2d3e-4f5a6b7c8d9l',
        message: 'Comment 14',
        timestamp_start: 585,
        timestamp_end: 623,
        updated_at: '2025-12-07T12:13:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0m',
        message: 'Comment 15',
        timestamp_start: 630,
        timestamp_end: 632,
        updated_at: '2025-12-07T12:14:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
    ],
  },
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: { isAuthenticated: () => true },
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.post(`${import.meta.env.VITE_API_ENDPOINT}/videos/:videouuid/comments`, async ({ request }) => {
          const commentData = (await request.json()) as any
          await delay(300)
          return HttpResponse.json({
            uuid: crypto.randomUUID(),
            message: commentData?.message || '',
            timestamp_start: commentData?.timestamp_start || 0,
            timestamp_end: commentData?.timestamp_end || 0,
            updated_at: new Date(Date.now()).toISOString(),
            user: {
              uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
              name: 'User1',
              picture: null,
            },
          })
        }),
      ],
    },
  },
  globals: {
    minWidth: '400px',
  },
}

export const NotLoggedIn: Story = {
  args: {
    videoUUID: '324bced6-4e7f-4e96-b74b-f0bbdd595868',
    videoTimecode: 20,
    videoLength: 60,
    comments: [
      {
        uuid: 'a1e2d3c4-5f6b-7a8c-9d0e-1f2a3b4c5d6e',
        message: 'Comment 1',
        timestamp_start: 0,
        timestamp_end: 100,
        updated_at: '2025-12-07T12:00:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7f',
        message: 'Comment 2',
        timestamp_start: 45,
        timestamp_end: 145,
        updated_at: '2025-12-07T12:01:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8a',
        message: 'Comment 3',
        timestamp_start: 90,
        timestamp_end: 190,
        updated_at: '2025-12-07T12:02:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'd4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9b',
        message: 'Comment 4',
        timestamp_start: 135,
        timestamp_end: 235,
        updated_at: '2025-12-07T12:03:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0c',
        message: 'Comment 5',
        timestamp_start: 180,
        timestamp_end: 280,
        updated_at: '2025-12-07T12:04:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1d',
        message: 'Comment 6',
        timestamp_start: 225,
        timestamp_end: 325,
        updated_at: '2025-12-07T12:05:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2e',
        message: 'Comment 7',
        timestamp_start: 270,
        timestamp_end: 370,
        updated_at: '2025-12-07T12:06:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3f',
        message: 'Comment 8',
        timestamp_start: 315,
        timestamp_end: 415,
        updated_at: '2025-12-07T12:07:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4g',
        message: 'Comment 9',
        timestamp_start: 360,
        timestamp_end: 460,
        updated_at: '2025-12-07T12:08:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'd0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5h',
        message: 'Comment 10',
        timestamp_start: 405,
        timestamp_end: 505,
        updated_at: '2025-12-07T12:09:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6i',
        message: 'Comment 11',
        timestamp_start: 450,
        timestamp_end: 550,
        updated_at: '2025-12-07T12:10:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7j',
        message: 'Comment 12',
        timestamp_start: 495,
        timestamp_end: 595,
        updated_at: '2025-12-07T12:11:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8k',
        message: 'Comment 13',
        timestamp_start: 540,
        timestamp_end: 600,
        updated_at: '2025-12-07T12:12:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'b4c5d6e7-8f9a-0b1c-2d3e-4f5a6b7c8d9l',
        message: 'Comment 14',
        timestamp_start: 585,
        timestamp_end: 623,
        updated_at: '2025-12-07T12:13:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
      {
        uuid: 'c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0m',
        message: 'Comment 15',
        timestamp_start: 630,
        timestamp_end: 632,
        updated_at: '2025-12-07T12:14:00.000Z',
        user: {
          uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
          name: 'User1',
          picture: null,
        },
      },
    ],
  },
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: { isAuthenticated: () => false },
    }),
  ],
  globals: {
    minWidth: '400px',
  },
}

export const NoComments: Story = {
  args: {
    videoUUID: '324bced6-4e7f-4e96-b74b-f0bbdd595868',
    videoTimecode: 20,
    videoLength: 60,
    comments: [],
  },
  decorators: [
    withReactContext({
      context: AuthContext,
      contextValue: { isAuthenticated: () => true },
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.post(`${import.meta.env.VITE_API_ENDPOINT}/videos/:videouuid/comments`, async ({ request }) => {
          const commentData = (await request.json()) as any
          await delay(300)
          return HttpResponse.json({
            uuid: crypto.randomUUID(),
            message: commentData?.message || '',
            timestamp_start: commentData?.timestamp_start || 0,
            timestamp_end: commentData?.timestamp_end || 0,
            updated_at: new Date(Date.now()).toISOString(),
            user: {
              uuid: '8f8ca331-fbe3-4542-bf68-f11df328e58d',
              name: 'User1',
              picture: null,
            },
          })
        }),
      ],
    },
  },
  globals: {
    minWidth: '400px',
  },
}

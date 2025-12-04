import type { Meta, StoryObj } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse, delay } from 'msw'
import VideoData from './VideoCollectionStoryData.json'

import { VideoCollection } from './VideoCollection'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
})

const meta = {
  title: 'Dashboard/VideoCollection',
  component: VideoCollection,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof VideoCollection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  loaders: [
    () => {
      queryClient.clear()
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_ENDPOINT}/videos`, () => {
          return HttpResponse.json(VideoData)
        }),
      ],
    },
  },
}

export const Loading: Story = {
  args: {},
  loaders: [
    () => {
      queryClient.clear()
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_ENDPOINT}/videos`, async () => {
          await delay(9999999)
          return HttpResponse.json(VideoData)
        }),
      ],
    },
  },
}

export const Error: Story = {
  args: {},
  loaders: [
    () => {
      queryClient.clear()
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_ENDPOINT}/videos`, async () => {
          await delay(500)
          return HttpResponse.json(
            {
              error: 'Unauthorized',
            },
            {
              status: 401,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
        }),
      ],
    },
  },
}

import type { Decorator, Preview } from '@storybook/react-vite'
import { createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/assets/styles/main.css'

// https://github.com/TanStack/router/discussions/952#discussioncomment-13075514
const RouterDecorator: Decorator = (Story) => {
  const rootRoute = createRootRoute({ component: () => <Story /> })
  const routeTree = rootRoute
  const router = createRouter({ routeTree })
  return <RouterProvider router={router} />
}

const MinMaxWidthDecorator: Decorator = (Story, Context) => {
  const styleObj: { [key: string]: string } = {}
  if (Context.storyGlobals.maxWidth) styleObj.maxWidth = Context.storyGlobals.maxWidth
  if (Context.storyGlobals.minWidth) styleObj.minWidth = Context.storyGlobals.minWidth

  return (
    <div style={styleObj}>
      <Story />{' '}
    </div>
  )
}

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize()

const preview: Preview = {
  decorators: [RouterDecorator, MinMaxWidthDecorator],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#070707' },
        light: { name: 'Light', value: '#fcfcfc' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
}

export default preview

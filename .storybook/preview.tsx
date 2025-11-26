import type { Decorator, Preview } from '@storybook/react-vite'
import { createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'
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

const preview: Preview = {
  decorators: [RouterDecorator, MinMaxWidthDecorator],
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

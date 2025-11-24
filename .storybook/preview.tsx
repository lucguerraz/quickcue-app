import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/assets/styles/main.css'

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
  decorators: [MinMaxWidthDecorator],
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

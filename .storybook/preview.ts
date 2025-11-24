import type { Preview } from '@storybook/react-vite'
import '../src/assets/styles/main.css'

const preview: Preview = {
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

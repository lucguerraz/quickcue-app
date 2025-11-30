import type { Meta, StoryObj } from '@storybook/react-vite'

import { LinkButton } from './LinkButton'

const meta = {
  title: 'Core/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { to: '/' },
} satisfies Meta<typeof LinkButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Link Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Link Button',
  },
}

export const Translucent: Story = {
  args: {
    variant: 'translucent',
    children: 'Translucent Link Button',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete Account',
  },
}

export const Wire: Story = {
  args: {
    variant: 'wire',
    children: 'Wire Link Button',
  },
}

export const WireDanger: Story = {
  args: {
    variant: 'wire-danger',
    children: 'Wire Danger Link Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Link Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Link Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Link Button',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Link Button',
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Link Button with Icon',
    icon: 'new',
  },
}

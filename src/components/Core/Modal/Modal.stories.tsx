import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Modal } from './Modal'
import { Button } from '@/components/Core/Button'
import { Input } from '@/components/Core/Input'
import { InputFile } from '@/components/Core/InputFile'

const meta = {
  title: 'Core/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: { onSave: fn() },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Edit Video',
    children: (
      <>
        <Input label="Video Title" name="videotitle" />
        <Input label="Video Title (With Value)" name="videotitlewithvalue" value="My Video" />
        <Input label="Video Title (With Error)" name="videotitlewitherror" error="can't be empty" />
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Video</span>
          <Button variant="wire-danger" size="medium">
            Delete Video
          </Button>
        </div>
      </>
    ),
  },
}

export const LongModal: Story = {
  args: {
    title: 'Edit Account',
    children: (
      <>
        <InputFile label="Profile Picture" name="profilepicture" />
        <Input label="Name" name="name" />
        <Input label="Email Adress" name="email" type="email" />
        <Input label="Field #1" name="field1" />
        <Input label="Field #2" name="field2" />
        <Input label="Field #3" name="field3" />
        <Input label="Field #4" name="field4" />
        <Input label="Field #5" name="field5" />
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Account</span>
          <Button variant="wire-danger" size="medium">
            Delete Account
          </Button>
        </div>
      </>
    ),
  },
}

export const NoButtons: Story = {
  args: {
    title: 'Edit Video',
    showButtons: false,
    children: (
      <>
        <Input label="Video Title" name="videotitle" />
        <Input label="Video Title (With Value)" name="videotitlewithvalue" value="My Video" />
        <Input label="Video Title (With Error)" name="videotitlewitherror" error="can't be empty" />
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Video</span>
          <Button variant="wire-danger" size="medium">
            Delete Video
          </Button>
        </div>
      </>
    ),
  },
}

export const NoCloseButton: Story = {
  args: {
    title: 'Edit Video',
    showCloseButton: false,
    children: (
      <>
        <Input label="Video Title" name="videotitle" />
        <Input label="Video Title (With Value)" name="videotitlewithvalue" value="My Video" />
        <Input label="Video Title (With Error)" name="videotitlewitherror" error="can't be empty" />
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Video</span>
          <Button variant="wire-danger" size="medium">
            Delete Video
          </Button>
        </div>
      </>
    ),
  },
}

export const NoSubmitButton: Story = {
  args: {
    title: 'Edit Video',
    showSubmitButton: false,
    children: (
      <>
        <Input label="Video Title" name="videotitle" />
        <Input label="Video Title (With Value)" name="videotitlewithvalue" value="My Video" />
        <Input label="Video Title (With Error)" name="videotitlewitherror" error="can't be empty" />
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Video</span>
          <Button variant="wire-danger" size="medium">
            Delete Video
          </Button>
        </div>
      </>
    ),
  },
}

export const CustomCloseButton: Story = {
  args: {
    title: 'Edit Video',
    closeButtonText: 'Hide modal',
    children: (
      <>
        <Input label="Video Title" name="videotitle" />
        <Input label="Video Title (With Value)" name="videotitlewithvalue" value="My Video" />
        <Input label="Video Title (With Error)" name="videotitlewitherror" error="can't be empty" />
        <div className="relative flex w-full items-center justify-between pb-2 has-disabled:opacity-50">
          <span className="text-xl font-medium">Delete Video</span>
          <Button variant="wire-danger" size="medium">
            Delete Video
          </Button>
        </div>
      </>
    ),
  },
}

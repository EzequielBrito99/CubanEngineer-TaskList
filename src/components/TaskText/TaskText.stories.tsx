import type { Meta, StoryObj } from '@storybook/react-vite';
import { TaskText } from '@/components/TaskText/TaskText';

/**
 * Meta configuration for the TaskText component.
 * It defines how the component appears in the Storybook sidebar and its global settings.
 */
const meta = {
  title: 'Components/TaskText',
  component: TaskText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'The content to be parsed' },
  },
} satisfies Meta<typeof TaskText>;

export default meta;

/**
 * Story type based on the meta configuration.
 * This ensures that 'args' match the props of the TaskText component.
 */
type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  args: {
    text: 'Standard task message without special entities.',
  },
};

export const ComplexExample: Story = {
  args: {
    text: 'Send #feedback to admin@taskapp.com or visit https://taskapp.com @dev_team',
  },
};
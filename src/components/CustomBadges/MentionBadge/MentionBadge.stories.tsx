import type { Meta, StoryObj } from '@storybook/react-vite';
import { MentionBadge } from './MentionBadge';

/**
 * Story for MentionBadge. 
 * Shows how mentions are displayed with a pastel green theme and an icon.
 */
const meta: Meta<typeof MentionBadge> = {
  title: 'Components/CustomBadges/MentionBadge',
  component: MentionBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The username or mention text (with or without @)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MentionBadge>;

export const Default: Story = {
  args: {
    label: '@user',
  },
};

export const WithoutAtSymbol: Story = {
  args: {
    label: 'team-lead',
  },
};

export const LongMention: Story = {
  args: {
    label: '@a-very-long-username-that-might-overflow',
  },
};
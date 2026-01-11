import type { Meta, StoryObj } from '@storybook/react-vite';
import { HashtagBadge } from './HashtagBadge';

const meta: Meta<typeof HashtagBadge> = {
  title: 'Components/CustomBadges/HashtagBadge',
  component: HashtagBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The tag text (with or without #)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HashtagBadge>;

export const Default: Story = {
  args: {
    label: '#development',
  },
};

export const WithoutSymbol: Story = {
  args: {
    label: 'frontend',
  },
};

export const LongTag: Story = {
  args: {
    label: '#very-long-hashtag-name-for-testing',
  },
};
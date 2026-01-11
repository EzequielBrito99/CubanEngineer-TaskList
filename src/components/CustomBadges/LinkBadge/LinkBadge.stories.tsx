import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkBadge } from './LinkBadge';

/**
 * Story for LinkBadge.
 * Demonstrates how URLs are rendered as badges with automatic protocol handling.
 */
const meta: Meta<typeof LinkBadge> = {
  title: 'Components/CustomBadges/LinkBadge',
  component: LinkBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The URL to display and link to (e.g. "Link 1" or "example.com")',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkBadge>;

/**
 * Common use case: numbered link from TaskText
 */
export const NumberedLink: Story = {
  args: {
    label: 'Link 1',
  },
};

/**
 * Use case: raw URL as label
 */
export const RawUrl: Story = {
  args: {
    label: 'google.com',
  },
};

export const FullSecureUrl: Story = {
  args: {
    label: 'https://github.com/facebook/react',
  },
};
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MentionBadge } from './MentionBadge';

describe('MentionBadge', () => {
  it('should render the label without the leading @', () => {
    render(<MentionBadge label="@user" />);
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.queryByText('@user')).not.toBeInTheDocument();
  });

  it('should render the label as is if it does not start with @', () => {
    render(<MentionBadge label="admin" />);
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('should render the mention (at-sign) icon', () => {
    const { container } = render(<MentionBadge label="@user" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
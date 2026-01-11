import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HashtagBadge } from './HashtagBadge';

describe('HashtagBadge component', () => {
  it('should render the label without the leading #', () => {
    render(<HashtagBadge label="#work" />);
    expect(screen.getByText('work')).toBeInTheDocument();
    expect(screen.queryByText('#work')).not.toBeInTheDocument();
  });

  it('should render the label as is if it does not start with #', () => {
    render(<HashtagBadge label="urgent" />);
    expect(screen.getByText('urgent')).toBeInTheDocument();
  });

  it('should render the hashtag icon', () => {
    const { container } = render(<HashtagBadge label="#task" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
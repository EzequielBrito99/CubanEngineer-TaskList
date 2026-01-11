import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LinkBadge } from './LinkBadge';

describe('LinkBadge', () => {
  it('should render the label correctly', () => {
    render(<LinkBadge label="google.com" />);
    expect(screen.getByText('google.com')).toBeInTheDocument();
  });

  it('should prepend https:// if the label missing it', () => {
    render(<LinkBadge label="github.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com');
  });

  it('should not prepend https:// if already present', () => {
    render(<LinkBadge label="https://vitest.dev" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://vitest.dev');
  });

  it('should have security attributes for target="_blank"', () => {
    render(<LinkBadge label="google.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
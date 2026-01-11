import { EmailBadge } from '@/components/CustomBadges/EmailBudge/EmailBadge';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('EmailBadge component', () => {
  const email = 'test@example.com';
  const label = 'Mail 1';

  it('should render the email address and have a valid mailto link', () => {
    render(<EmailBadge email={email} label={label} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `mailto:${email}`);
    expect(link).toHaveTextContent(label);
  });

  it('should render a custom label instead of the email when provided', () => {
    render(<EmailBadge email={email} label={label} />);
    const link = screen.getByRole('link');
    expect(link).not.toHaveTextContent(email);
    expect(link).toHaveTextContent(label);
    expect(link).toHaveAttribute('href', `mailto:${email}`);
  });

  it('should render the mail icon', () => {
    const { container } = render(<EmailBadge email={email} label={label} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
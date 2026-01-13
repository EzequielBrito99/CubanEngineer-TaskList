import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

/**
 * Tests for the Button UI component.
 * @remarks
 * Tests various style variants and the 'asChild' behavior using Radix Slot.
 * Ensures 100% branch coverage by testing default and custom props.
 */
describe('Button UI Component', () => {
  it('should render correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('inline-flex');
  });

  it('renders as a slot when asChild is true', () => {
    render(<Button asChild><a href="#">Link</a></Button>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should apply different variant classes', () => {
    render(<Button variant="secondary">Cancel</Button>);
    const button = screen.getByRole('button', { name: /cancel/i });
    expect(button).toHaveClass('bg-secondary');
  });

  it('should apply custom classNames', () => {
    render(<Button className="custom-test-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-test-class');
  });

  it('should cover all default branch assignments', () => {
    const { rerender } = render(<Button>Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');
  });

  it('should render as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('inline-flex');
  });
});
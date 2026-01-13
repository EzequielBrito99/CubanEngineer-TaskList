import { Badge } from '@/components/ui/badge';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

/**
 * Tests for the base UI Badge component.
 * * @remarks
 * These tests cover all logical branches, including default prop assignments 
 * and optional className merging, to ensure 100% coverage of the shadcn/ui primitive.
 */
describe('Badge UI Component', () => {
  // Case 1: All props undefined (Tests default variant and empty className)
  it('renders with no props', () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  // Case 2: Custom variant, no className
  it('renders a specific variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline')).toHaveClass('text-foreground');
  });

  // Case 3: Both custom variant and custom className
  it('merges custom classes with variant classes', () => {
    render(<Badge variant="secondary" className="custom-class">Merged</Badge>);
    const badge = screen.getByText('Merged');
    expect(badge).toHaveClass('bg-secondary');
    expect(badge).toHaveClass('custom-class');
  });
});
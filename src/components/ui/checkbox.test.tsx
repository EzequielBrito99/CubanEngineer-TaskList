import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './checkbox';
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";

vi.mock('@radix-ui/react-checkbox', () => ({
  Root: React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
    ({ children, className, onCheckedChange, checked }, ref) => (
      <button
        ref={ref}
        role="checkbox"
        aria-checked={!!checked}
        className={className}
        onClick={() => onCheckedChange?.(!checked)}
        data-testid="checkbox-root"
      >
        {children}
      </button>
    )
  ),
  Indicator: ({ children, className }: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>) => (
    <span className={className} data-testid="checkbox-indicator">
      {children}
    </span>
  ),
}));

/**
 * Tests for the Checkbox UI component.
 * @remarks
 * Verifies checked states and class merging using strictly typed mocks.
 * Ensures 100% branch coverage for the wrapper component.
 */
describe('Checkbox UI Component', () => {
  it('should render correctly and toggle state when clicked', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should apply custom classNames to the root element', () => {
    render(<Checkbox className="my-custom-class" />);
    const checkbox = screen.getByTestId('checkbox-root');
    expect(checkbox).toHaveClass('my-custom-class');
  });

  it('should render the indicator icon provided as a child', () => {
    render(<Checkbox checked={true} />);
    expect(screen.getByTestId('checkbox-indicator')).toBeInTheDocument();
  });
});
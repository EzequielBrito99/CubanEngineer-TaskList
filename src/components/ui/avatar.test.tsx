import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import type * as AvatarPrimitive from "@radix-ui/react-avatar";

vi.mock('@radix-ui/react-avatar', () => ({
  Root: ({ children, className }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) => (
    <div data-testid="avatar-root" className={className}>{children}</div>
  ),
  Image: ({ src, alt, className }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) => (
    <img src={src} alt={alt} className={className} />
  ),
  Fallback: ({ children, className }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) => (
    <div data-testid="avatar-fallback" className={className}>{children}</div>
  ),
}));

/**
 * Simplified and type-safe tests for Avatar component.
 * @remarks
 * Mocks Radix primitives using official React types to ensure 100% coverage
 * without the complexity of JSDOM image loading states.
 */
describe('Avatar UI Component', () => {
  it('should render the avatar image and fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://github.com/shadcn.png');
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should apply custom classNames to the root component', () => {
    render(
      <Avatar className="custom-root-class">
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    );

    const root = screen.getByTestId('avatar-root');
    expect(root).toHaveClass('custom-root-class');
  });

  it('should apply custom classNames to the fallback component', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback-class">FB</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toHaveClass('custom-fallback-class');
  });
});
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Unit Test Setup', () => {
  it('should verify that Vitest and Testing Library are working', () => {
    render(<h1>Working!</h1>);
    expect(screen.getByText('Working!')).toBeDefined();
  });
});
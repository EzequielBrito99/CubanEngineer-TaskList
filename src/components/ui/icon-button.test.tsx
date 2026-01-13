import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IconButton } from './icon-button';
import { FaPlus } from 'react-icons/fa';

describe('IconButton UI Component', () => {
  it('should render the react-icon and the text content', () => {
    render(<IconButton icon={FaPlus}>Add Task</IconButton>);
    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
  });

  it('should apply the correct size to the icon', () => {
    render(<IconButton icon={FaPlus}>Size Test</IconButton>);
    const icon = screen.getByTestId('button-icon');
    expect(icon).toHaveAttribute('height', '16');
    expect(icon).toHaveAttribute('width', '16');
  });

  it('should inherit variant styles from the base Button', () => {
    render(
      <IconButton icon={FaPlus} variant="outline">
        Outline
      </IconButton>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-input');
  });

  it('renders correctly without custom className and with default Button props', () => {
    render(<IconButton icon={FaPlus}>No Extra Classes</IconButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('gap-2');
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskForm } from './TaskForm';

describe('TaskForm Integration Tests', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  it('should handle the full flow of creating a new task', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    const textarea = screen.getByPlaceholderText(/write a task/i);
    fireEvent.change(textarea, { target: { value: 'New task' } });
    const addBtn = screen.getByRole('button', { name: /add/i });
    expect(addBtn).toBeEnabled();
    const publicBtn = screen.getByRole('button', { name: /public/i });
    fireEvent.click(publicBtn);
    fireEvent.click(addBtn);
    expect(mockOnSave).toHaveBeenCalledWith('New task');
  });

  it('should handle the full flow of editing an existing task', () => {
    render(
      <TaskForm
        initialValue="Original task"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    const textarea = screen.getByDisplayValue('Original task');
    fireEvent.change(textarea, { target: { value: 'Edited task' } });
    const saveBtn = screen.getByRole('button', { name: /save/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(mockOnCancel).toHaveBeenCalled();
    fireEvent.click(saveBtn);
    expect(mockOnSave).toHaveBeenCalledWith('Edited task');
  });

  it('should toggle user avatar interactivity based on input content', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    const avatar = screen.getByTestId('user-avatar');
    const textarea = screen.getByPlaceholderText(/write a task/i);
    expect(avatar).toHaveClass('opacity-40');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(avatar).toHaveClass('cursor-pointer');
    expect(avatar).not.toHaveClass('opacity-40');
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskForm } from './TaskForm';

describe('TaskForm Component', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();
  const mockOnDelete = vi.fn();

  it('should render in "Ok" state by default (VscChromeClose icon)', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    expect(screen.getByText(/ok/i)).toBeInTheDocument();
  });

  it('should switch to "Add" state when typing a new task', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    const textarea = screen.getByPlaceholderText(/write a task/i);
    fireEvent.change(textarea, { target: { value: 'New Task' } });
    expect(screen.getByText(/add/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeEnabled();
  });

  it('should switch to "Save" state when editing existing task', () => {
    render(
      <TaskForm
        initialValue="Original"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    const textarea = screen.getByDisplayValue('Original');
    fireEvent.change(textarea, { target: { value: 'Original Modified' } });
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });

  it('should return to "Ok" state if edited text matches initialValue', () => {
    render(
      <TaskForm
        initialValue="Original"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    const textarea = screen.getByDisplayValue('Original');
    fireEvent.change(textarea, { target: { value: 'Changed' } });
    expect(screen.getByText(/save/i)).toBeInTheDocument();
    fireEvent.change(textarea, { target: { value: 'Original' } });
    expect(screen.getByText(/ok/i)).toBeInTheDocument();
  });

  it('should call onSave with trimmed text', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    const textarea = screen.getByPlaceholderText(/write a task/i);
    fireEvent.change(textarea, { target: { value: '   Clean Text   ' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockOnSave).toHaveBeenCalledWith('Clean Text');
  });

  it('should apply responsive classes for compact view', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    const openLabel = screen.getByText(/open/i);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    expect(openLabel).toHaveClass('max-[1230px]:hidden');
    expect(cancelBtn).toHaveClass('compact-hide');
  });

  it('should show delete button and call onDelete when editing', () => {
    render(
      <TaskForm
        initialValue="Task to delete"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toBeInTheDocument();
    
    fireEvent.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('should NOT show delete button when creating a new task', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} onDelete={mockOnDelete} />);
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });

  it('should bypass onSave if handleSave is called with empty text', () => {
    const mockOnSaveLocal = vi.fn();
    render(<TaskForm onSave={mockOnSaveLocal} onCancel={mockOnCancel} />);
    const textarea = screen.getByPlaceholderText(/write a task/i);
    fireEvent.change(textarea, { target: { value: '   ' } });
    const okButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(okButton);
    expect(mockOnSaveLocal).not.toHaveBeenCalled();
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { TaskList } from './TaskList';

describe('TaskList Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should complete a full task lifecycle: create, display, and edit', () => {
    render(<TaskList />);
    
    fireEvent.click(screen.getByText(/type to add new task/i));
    const textarea = screen.getByPlaceholderText(/write a task/i);
    fireEvent.change(textarea, { target: { value: 'Integration Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Integration Task')).toBeInTheDocument();
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    expect(savedTasks[0].text).toBe('Integration Task');

    fireEvent.click(screen.getByText('Integration Task'));
    const editArea = screen.getByDisplayValue('Integration Task');
    fireEvent.change(editArea, { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.queryByText('Integration Task')).not.toBeInTheDocument();
    expect(screen.getByText('Updated Task')).toBeInTheDocument();
    
    const updatedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    expect(updatedTasks[0].text).toBe('Updated Task');
  });

  it('should toggle between creation form and trigger on cancel', () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText(/type to add new task/i));
    expect(screen.queryByText(/type to add new task/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.getByText(/type to add new task/i)).toBeInTheDocument();
  });
});
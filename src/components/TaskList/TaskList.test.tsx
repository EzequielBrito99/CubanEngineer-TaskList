import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskList } from './TaskList';

describe('TaskList Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render initial state and toggle creation mode', () => {
    render(<TaskList />);
    expect(screen.getByText(/type to add new task/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/type to add new task/i));
    expect(screen.getByPlaceholderText(/write a task/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.getByText(/type to add new task/i)).toBeInTheDocument();
  });

  it('should add a new task and persist in localStorage', () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText(/type to add new task/i));
    fireEvent.change(screen.getByPlaceholderText(/write a task/i), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('tasks') || '[]')[0].text).toBe('New Task');
  });

  it('should handle edition mode and cancelation correctly', () => {
    const mockTasks = [{ id: '1', text: 'Task 1' }, { id: '2', text: 'Task 2' }];
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
    render(<TaskList />);
    fireEvent.click(screen.getByText('Task 1'));
    expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue('Task 1'), { target: { value: 'Updated' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText('Updated')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Updated'));
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
  
  it('should prevent edit mode when clicking checkbox due to stopPropagation', () => {
    localStorage.setItem('tasks', JSON.stringify([{ id: '1', text: 'Stop Prop' }]));
    render(<TaskList />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('Stop Prop')).toBeInTheDocument();
  });
});
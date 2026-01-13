import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TaskText } from './TaskText';

describe('TaskText component', () => {
  it('should render plain text correctly', () => {
    const text = 'Just a simple task';
    render(<TaskText text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should render multiple entities with correct counters', () => {
    const text = 'Contact test@test.com and visit www.google.com. Also email dev@dev.com';
    render(<TaskText text={text} />);
    expect(screen.getByText('Mail 1')).toBeInTheDocument();
    expect(screen.getByText('Mail 2')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
  });

  it('should render mentions and hashtags', () => {
    const text = 'Hello @user please check #urgent';
    render(<TaskText text={text} />);
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.getByText('urgent')).toBeInTheDocument();
  });

  it('should preserve line breaks due to whitespace-pre-wrap', () => {
    const text = 'Line 1\nLine 2';
    const { container } = render(<TaskText text={text} />);    
    const span = container.querySelector('span');
    expect(span).toHaveClass('whitespace-pre-wrap');
  });
});
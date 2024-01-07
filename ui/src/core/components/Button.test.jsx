import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('has the correct classes applied', () => {
    const className = 'test-class';
    render(<Button className={className}>Click me</Button>);

    expect(screen.getByText('Click me')).toHaveClass('test-class');
    expect(screen.getByText('Click me')).toHaveClass('bg-indigo-600');
    expect(screen.getByText('Click me')).toHaveClass('hover:bg-indigo-700');
  });

});

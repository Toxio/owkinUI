import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { JobTable } from '@/pages/general/jobTable/JobTable.jsx';
import '@testing-library/jest-dom';

const mockRefetch = vi.fn();
vi.mock('@/core/api/index.js', () => ({
  useGetListQuery: vi.fn(() => ({ data: [{ status: 'processing' }], refetch: mockRefetch })),
}));
vi.mock('@/core/components', () => ({
  Button: ({ onClick, children, ...rest }) => (
    <button onClick={onClick} {...rest}>{children}</button>
  ),
}));
vi.mock('react-data-table-component', () => ({
  __esModule: true,
  default: vi.fn(() => <div>DataTable</div>),
}));

describe('JobTable', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders DataTable component', () => {
    render(<JobTable showResultClick={() => {}} />);
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('clears filters when Clear filters button is clicked', () => {
    render(<JobTable showResultClick={() => {}} />);

    const statusSelect = screen.getByTestId('status-select');
    fireEvent.change(statusSelect, { target: { value: 'processing' } });
    expect(statusSelect.value).toBe('processing');

    const clearButton = screen.getByText('Clear filters');
    fireEvent.click(clearButton);

    expect(statusSelect.value).toBe('');
  });

  it('calls refetch every 5 seconds when there are processing jobs', async () => {
    render(<JobTable showResultClick={() => {}} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockRefetch).toHaveBeenCalled();
  });

});

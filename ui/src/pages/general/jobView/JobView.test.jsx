import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JobView } from '@/pages/general/jobView/JobView.jsx';
import * as api from '@/core/api/index.js';
import '@testing-library/jest-dom';

// Mock the API and constants
vi.mock('@/core/api/index.js', () => ({
  useGetJobByIdQuery: vi.fn(),
}));
vi.mock('@/core/api/api.constant', () => ({
  baseUrl: 'http://localhost/api',
}));

describe('JobView', () => {
  const mockData = {
    id: '123',
    status: 'done',
    filter: 'None',
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
  };

  beforeEach(() => {
    api.useGetJobByIdQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays job information after loading', () => {
    render(<JobView id="123" />);
    expect(screen.getByText('Image info')).toBeInTheDocument();
    expect(screen.getByText('done')).toBeInTheDocument();
  });

  it('loads image correctly', () => {
    render(<JobView id="123" />);
    const image = screen.getByAltText('Job Result');
    expect(image).toHaveAttribute('src', 'http://localhost/api/job/result/123');
  });

  it('displays loading when job is being fetched', () => {
    api.useGetJobByIdQuery.mockReturnValue({ data: null, isLoading: true });
    render(<JobView id="123" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays no image when no ID is provided', () => {
    render(<JobView id="" />);
    expect(screen.getByText('No image')).toBeInTheDocument();
  });
});


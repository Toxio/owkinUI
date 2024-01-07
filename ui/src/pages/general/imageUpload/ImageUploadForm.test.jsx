import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { ImageUploadForm } from '@/pages/general/imageUpload/ImageUploadForm.jsx';
import '@testing-library/jest-dom';
import * as api from '@/core/api/index.js';

// Mock dependencies
const mockRefetch = vi.fn();
vi.mock('@/core/api/index.js', () => ({
  useCreateJobMutation: vi.fn(),
  useGetListQuery: vi.fn(() => ({ data: [{ status: 'processing' }], refetch: mockRefetch })),
}));
vi.mock('@/core/components/Button.jsx', () => ({
  Button: vi.fn(({ children, ...props }) => <button {...props}>{children}</button>),
}));
vi.mock('./ImageUploadPreview.jsx', () => ({
  ImageUploadPreview: vi.fn(() => <div>Image Upload Preview</div>),
}));

describe('ImageUploadForm', () => {
  let mockCreateJob, mockRefetch;

  beforeEach(() => {
    mockCreateJob = vi.fn(() => Promise.resolve());
    mockRefetch = vi.fn();

    api.useCreateJobMutation.mockReturnValue([mockCreateJob, { isLoading: false, error: null }]);
    api.useGetListQuery.mockReturnValue({ refetch: mockRefetch });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles file selection correctly', () => {
    render(<ImageUploadForm/>);
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['image-content'], 'image.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
  });

  it('displays error when trying to upload without selecting files', () => {
    global.alert = vi.fn();
    render(<ImageUploadForm/>);
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    expect(global.alert).toHaveBeenCalledWith('Please select files.');
  });

  it('uploads files when the upload button is clicked', async () => {
    render(<ImageUploadForm />);
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['image-content'], 'image.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Upload'));
    });

    expect(mockCreateJob).toHaveBeenCalled();
  });

  it('handles filter change', () => {
    render(<ImageUploadForm/>);
    const filterSelect = screen.getByTestId('filter-select');
    fireEvent.change(filterSelect, { target: { value: 'UnSharpening' } });
    expect(filterSelect.value).toBe('UnSharpening');
  });

  it('handles sigma change', () => {
    render(<ImageUploadForm/>);
    const sigmaInput = screen.getByTestId('sigma-input');
    fireEvent.change(sigmaInput, { target: { value: 5 } });
    expect(sigmaInput.value).toBe('5');
  });

  it('shows loading indicator while uploading', () => {
    api.useCreateJobMutation.mockReturnValue([vi.fn(), { isLoading: true, error: null }]);
    render(<ImageUploadForm/>);
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
  });

  it('displays error message on upload failure', () => {
    const mockError = new Error('Upload failed');
    api.useCreateJobMutation.mockReturnValue([vi.fn(), { isLoading: false, error: mockError }]);
    render(<ImageUploadForm/>);
    expect(screen.getByText(`Error: ${mockError.toString()}`)).toBeInTheDocument();
  });

});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ImageUploadPreview } from '@/pages/general/imageUpload/ImageUploadPreview.jsx';
describe('ImageUploadPreview', () => {
  beforeEach(() => {
    vi.spyOn(window, 'FileReader').mockImplementation(() => {
      return {
        readAsDataURL: vi.fn().mockImplementation(function () {
          this.onloadend({
            target: {
              result: 'data:image/png;base64,encoded-string',
            },
          });
        }),
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not render images if the files array is empty', () => {
    render(<ImageUploadPreview files={[]} />);
    const images = screen.queryAllByAltText('Preview');
    expect(images).toHaveLength(0);
  });

  it('renders images when files are provided', async () => {
    const file1 = new Blob(['file1'], { type: 'image/png' });
    const file2 = new Blob(['file2'], { type: 'image/png' });

    render(<ImageUploadPreview files={[file1, file2]} />);

    await waitFor(() => {
      const images = screen.getAllByAltText('Preview');
      expect(images).toHaveLength(2);
    });
  });
});

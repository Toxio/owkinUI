import { useState } from 'react';
import { useCreateJobMutation, useGetListQuery } from "@/core/api/index.js";
import { Button } from "@/core/components/Button.jsx";
import { ImageUploadPreview } from "./ImageUploadPreview.jsx";

export function ImageUploadForm() {
  const { refetch } = useGetListQuery();
  const [createJob, { isLoading, error }] = useCreateJobMutation();

  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('Blurring');
  const [sigma, setSigma] = useState(0);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!files.length) {
      alert('Please select files.');
      return;
    }

    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('filter', filter);
      formData.append('sigma', sigma);

      await createJob(formData);
    }

    refetch();
    setFiles(null);
    setFilter('Blurring');
    setSigma(0);

  };

  return (
    <form onSubmit={handleUpload} className="mx-auto mt-4 bg-white p-6 rounded shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Upload Image</h2>

      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="text-sm font-medium text-gray-700 mr-2">Image:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="flex-grow text-sm text-gray-500 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            data-testid="file-input"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <label className="text-sm font-medium text-gray-700 md:mx-2">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            data-testid="filter-select"
          >
            <option value="Blurring">Blurring</option>
            <option value="UnSharpening">UnSharpening</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <label className="text-sm font-medium text-gray-700 md:mx-2">Sigma:</label>
          <input
            type="number"
            value={sigma}
            onChange={(e) => setSigma(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:w-20"
            data-testid="sigma-input"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="md:ml-4"
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>

      <ImageUploadPreview files={files}/>

      {isLoading && <div className="text-gray-600">Submitting...</div>}
      {error && <div className="text-red-500">Error: {error.toString()}</div>}
    </form>
  );
}
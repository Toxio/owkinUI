import { Button } from "@/core/components";
import DataTable from 'react-data-table-component';
import { useMemo, useState } from "react";

export function JobTable({ data = [], showResultClick }) {
  const [filters, setFilters] = useState({
    status: '',
    filterType: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        (filters.status === '' || item.status === filters.status) &&
        (filters.filterType === '' || item.filter === filters.filterType)
      );
    });
  }, [data, filters]);

  const columns = [
    {
      name: 'Actions',
      button: true,
      cell: row => (
        <div className="flex justify-end h-fit">
          <Button onClick={() => showResultClick(row.id)}>
            Info
          </Button>
        </div>
      )
    },
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Filter',
      selector: row => row.filter,
      sortable: true,
    },
    {
      name: 'Start Time',
      selector: row => row.start_time,
      sortable: true,
      format: row => new Date(row.start_time).toLocaleString(),
    },
    {
      name: 'End Time',
      selector: row => row.end_time,
      sortable: true,
      format: row => new Date(row.end_time).toLocaleString(),
    },
  ];

  return (
    <div className="md:w-3/4 md:max-w-5xl overflow-auto">
      <div className="ml-7 flex flex-wrap gap-4 mb-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">All</option>
            <option value="done">Done</option>
            <option value="inprogress">In progress</option>
          </select>
        </div>

        <div>
          <label htmlFor="filterType" className="block text-sm font-medium text-gray-700">Filter</label>
          <select
            name="filterType"
            value={filters.filterType}
            onChange={handleFilterChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">All</option>
            <option value="blurring">Blurring</option>
            <option value="unsharpening">UnSharpening</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData}/>
    </div>
  );
}

import { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Button } from "@/core/components";
import DataTable from 'react-data-table-component';

export function JobTable({ data, showResultClick }) {
  const defaultFilters = {
    startDate: '',
    endDate: '',
    status: '',
    filterType: '',
  }

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const itemDate = new Date(item.start_time).setHours(0, 0, 0, 0);
      const startDate = filters.startDate ? new Date(filters.startDate).setHours(0, 0, 0, 0) : null;
      const endDate = filters.endDate ? new Date(filters.endDate).setHours(0, 0, 0, 0) : null;

      return (
        (startDate === null || itemDate === startDate) &&
        (endDate === null || itemDate === endDate) &&
        (filters.status === '' || item.status === filters.status) &&
        (filters.filterType === '' || item.filter === filters.filterType)
      );
    });
  }, [data, filters]);

  const columns = [
    {
      name: 'Actions',
      cell: row => (
        <div className="flex justify-end h-fit">
          <Button className='ml-2' onClick={() => showResultClick(row.id)}>
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
      <div className="ml-7 flex flex-wrap gap-4 mb-4 items-center">

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>


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

        <Button
          onClick={()=> setFilters(defaultFilters)}
          className="mt-6"
        >
          Clea filters
        </Button>

      </div>

      <DataTable columns={columns} data={filteredData}/>
    </div>
  );
}

JobTable.propTypes = {
  data: PropTypes.array,
  showResultClick: PropTypes.func,
};

JobTable.defaultProps = {
  data: [],
}
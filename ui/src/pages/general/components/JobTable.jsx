import { Button } from "@/core/components";
import { formatDate } from "@/utils";

export function JobTable({ data = [], showResultClick, isLoading }) {
  return (
    <div className="md:w-3/4 max-w-4xl overflow-auto">
      <div className="bg-white shadow-md rounded my-6">
        {/* Table Header */}
        <div className="flex border-b border-gray-200 p-4">
          <div className="w-1/6 font-bold text-gray-600">ID</div>
          <div className="w-1/6 font-bold text-gray-600">Status</div>
          <div className="w-1/6 font-bold text-gray-600">Filter</div>
          <div className="w-1/6 font-bold text-gray-600">Start Time</div>
          <div className="w-1/6 font-bold text-gray-600">End Time</div>
          <div className="w-1/6 font-bold text-gray-600"></div>
        </div>
        {/* Table Rows */}
        {data.length > 0 ?
          data.map((item) => (
            <div className="flex border-b border-gray-200 p-4" key={item.id}>
              <div className="w-1/6 text-gray-700 pr-2">{item.id}</div>
              <div className="w-1/6 text-gray-700">{item.status}</div>
              <div className="w-1/6 text-gray-700 pr-2">{item.filter}</div>
              <div className="w-1/6 text-gray-700 pr-2">{formatDate(item.start_time)}</div>
              <div className="w-1/6 text-gray-700 pr-2">{formatDate(item.end_time)}</div>
              <div className="w-1/6 flex justify-end h-fit">
                <Button disabled={isLoading} onClick={() => showResultClick(item.id)}>
                  Show more
                </Button>
              </div>
            </div>
          ))
          : <p className='font-bold'>Loading...</p>
        }
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { useGetJobByIdQuery } from "@/core/api/index.js";
import { formatDate } from "@/utils/index.js";

export function JobView({ id }) {
  const { data: jobInfo, isLoading: loadingInfo } = useGetJobByIdQuery(id, {
    skip: !id,
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [id]);

  return (
    <div className="relative md:w-1/4 mt-6 ml-6">
      {(!imageLoaded || loadingInfo) && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-sm font-semibold text-gray-500">{id ? 'Loading...' : 'No image'}</div>
        </div>
      )}
      <div>
        {!loadingInfo && jobInfo &&
          <div className="mb-4 p-4 bg-white shadow rounded ">
            <p className='font-bold text-gray-600'>Image info</p>
            <p className="font-semibold">ID: <span className="font-normal">{jobInfo.id}</span></p>
            <p className="font-semibold">Status: <span className="font-normal">{jobInfo.status}</span></p>
            <p className="font-semibold">Filter: <span className="font-normal">{jobInfo.filter}</span></p>
            <p className="font-semibold">Start Time: <span
              className="font-normal">{formatDate(jobInfo.start_time)}</span></p>
            <p className="font-semibold">End Time: <span className="font-normal">{formatDate(jobInfo.end_time)}</span>
            </p>
          </div>
        }
        <img
          className={`w-full h-auto ${!imageLoaded ? 'invisible' : ''}`}
          src={`http://0.0.0.0:8080/job/result/${id}`}
          onLoad={() => setImageLoaded(true)}
          alt="Job Result"
          style={{ transition: 'opacity 0.3s' }}
        />
      </div>
    </div>
  );
}
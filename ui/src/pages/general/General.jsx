import { useGetListQuery } from "@/core/api";
import { useState } from "react";
import { ImageUploadForm } from './components/ImageUploadForm';
import { JobTable } from "./components/JobTable";
import { JobView } from "@/pages/general/components/index.js";

export function General() {
  const { data, refetch } = useGetListQuery();
  const [jobId, setJobId] = useState(null);

  const handleShowResultClick = (id) => {
    setJobId(id);
  };

  return (
    <div className='w-screen flex flex-col items-center pt-6 h-screen md:overflow-hidden'>
      <h1 className='text-xl md:text-4xl'>Owkin</h1>
      <ImageUploadForm updateList={refetch}/>
      <div className='flex w-full justify-center md:h-3/4'>
        <JobTable
          data={data}
          showResultClick={handleShowResultClick}
        />
        <JobView id={jobId}/>
      </div>
    </div>
  );
}




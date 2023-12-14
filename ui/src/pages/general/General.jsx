import { useGetListQuery } from "@/core/api";
import { useState } from "react";
import { ImageUploadForm } from './components/ImageUploadForm';
import { JobTable } from "./components/JobTable";
import { JobView } from "@/pages/general/components/index.js";
import logoImg from '@/assets/logo.png';

export function General() {
  const { data, refetch } = useGetListQuery();
  const [jobId, setJobId] = useState(null);

  const handleShowResultClick = (id) => {
    setJobId(id);
  };

  return (
    <div className='w-screen flex flex-col items-center pt-6 h-screen md:overflow-hidden'>
      <div className='flex h-10 w-10 items-center'>
        <img src={logoImg} alt='logo'/>
        <h1 className='text-xl md:text-4xl'>Owkin</h1>
      </div>
      <ImageUploadForm updateList={refetch}/>
      <div className='flex w-full justify-center mt-6 md:h-3/4 flex-col-reverse md:flex-row '>
        <JobTable
          data={data}
          showResultClick={handleShowResultClick}
        />
        <JobView id={jobId}/>
      </div>
    </div>
  );
}




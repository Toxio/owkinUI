import { useState } from "react";
import { ImageUploadForm } from '@/pages/general/components/ImageUploadForm.jsx';
import { JobTable } from "./components/JobTable";
import { JobView } from "@/pages/general/components/index.js";
import logoImg from '@/assets/logo.png';

export function General() {
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
      <ImageUploadForm />
      <div className='flex w-full justify-center mt-6 md:h-[55%] flex-col-reverse md:flex-row '>
        <JobTable
          showResultClick={handleShowResultClick}
        />
        <JobView id={jobId}/>
      </div>
    </div>
  );
}




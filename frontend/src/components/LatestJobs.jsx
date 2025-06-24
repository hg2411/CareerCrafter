import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const LatestJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto px-6 my-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      {allJobs.length <= 0 ? (
        <div className="text-center text-gray-500 text-lg">No Jobs Available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;

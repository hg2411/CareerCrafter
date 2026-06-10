import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const LatestJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);

  // 1. Get today's timestamp normalized to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 2. Filter out expired jobs first
  const activeJobs = (allJobs || []).filter((job) => {
    if (!job?.lastDate) return true;
    const jobLastDate = new Date(job.lastDate);
    jobLastDate.setHours(0, 0, 0, 0);
    return jobLastDate >= today;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 my-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      {activeJobs.length <= 0 ? (
        <div className="text-center text-gray-500 text-lg">No Jobs Available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3. Reverse the active jobs so the newest show first, then grab the top 6 */}
          {[...activeJobs]
            .reverse()
            .slice(0, 6)
            .map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
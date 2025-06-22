import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Browse Jobs
          <span className="text-blue-600 ml-2">({allJobs.length})</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length > 0 ? (
            allJobs.map((job) => (
              <div
                key={job._id}
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                <Job job={job} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;

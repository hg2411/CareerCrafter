import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams(); // contains jobId from URL
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
        setJob(res.data.job);
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='rounded-3xl bg-white shadow-xl border border-gray-200 p-8 mb-8'>
          <div className='flex flex-col lg:flex-row lg:justify-between gap-6'>
            <div>
              <p className='text-sm uppercase tracking-[0.24em] text-slate-400 mb-3'>Job Applicants</p>
              <h1 className='text-4xl font-black text-slate-900'>
                {job?.title || 'Applicants'}
              </h1>
              <p className='mt-3 text-slate-600 max-w-2xl'>
                {job?.company?.name
                  ? `${job.company.name} · ${job.location || 'Remote/Unknown'}`
                  : 'View and manage candidate applications for this opening.'}
              </p>
            </div>
            <div className='flex flex-col justify-between gap-4 text-right'>
              <div>
                <p className='text-sm text-slate-500'>Total Applicants</p>
                <p className='text-3xl font-semibold text-slate-900'>
                  {applicants?.applications?.length || 0}
                </p>
              </div>
              <div>
                <p className='text-sm text-slate-500'>Application deadline</p>
                <p className='text-lg font-semibold text-slate-800'>
                  {job?.lastDate ? new Date(job.lastDate).toLocaleDateString('en-IN') : 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ApplicantsTable jobId={params.id} job={job} />
      </div>
    </div>
  );
};

export default Applicants;

import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((application) => application.applicant === user?._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-2xl shadow-xl mt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full">
              {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
            </Badge>
            <Badge className="bg-red-100 text-red-600 font-medium px-3 py-1 rounded-full">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 font-medium px-3 py-1 rounded-full">
              ₹{singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Divider */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Job Description</h2>

      {/* Job Details */}
      <div className="space-y-5 text-gray-700">
        <div className="flex gap-2">
          <span className="font-semibold w-32">Role:</span>
          <span className="text-gray-900">{singleJob?.title}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold w-32">Location:</span>
          <span className="text-gray-900">{singleJob?.location}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold w-32">Description:</span>
          <span className="text-gray-900">{singleJob?.description}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold w-32">Experience:</span>
          <span className="text-gray-900">{singleJob?.experience || 'Not Available'}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold w-32">Salary:</span>
          <span className="text-gray-900">₹{singleJob?.salary} LPA</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold w-32">Applicants:</span>
          <span className="text-gray-900">
            {singleJob?.applications?.length || 0}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold w-32">Posted On:</span>
          <span className="text-gray-900">{singleJob?.createdAt?.split('T')[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

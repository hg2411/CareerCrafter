import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MapPin, Users, Briefcase, IndianRupee, CalendarDays, FileText } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [userApplication, setUserApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      setLoading(false);

      if (res.data.success) {
        const newApp = res.data.application;

        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), {
            ...newApp,
            applicant: user?._id
          }]
        };

        dispatch(setSingleJob(updatedSingleJob));
        setUserApplication({ ...newApp, applicant: user?._id });
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 409) {
        toast.info("You have already applied to this job.");
        // Try setting the status again from already fetched job
        const existing = singleJob?.applications?.find(
          (app) => app.applicant?._id === user?._id || app.applicant === user?._id
        );
        setUserApplication(existing || null);
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      }
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          const foundApplication = res.data.job.applications?.find(
            (app) => app.applicant?._id === user?._id || app.applicant === user?._id
          );

          setUserApplication(foundApplication || null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const isApplied = !!userApplication;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'bg-green-600';
      case 'rejected':
        return 'bg-red-600';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-10 bg-white rounded-2xl shadow-xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white px-3 py-1">
              {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
            </Badge>
            <Badge className="bg-gradient-to-r from-[#F83002] to-[#FF5E3A] text-white px-3 py-1">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-gradient-to-r from-[#38A169] to-[#68D391] text-white px-3 py-1 flex items-center gap-1">
              <IndianRupee className="w-4 h-4" /> {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex flex-col gap-2 items-end">
          <Button
            onClick={isApplied || loading ? null : applyJobHandler}
            disabled={isApplied || loading}
            className={`text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 ${
              isApplied || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90'
            }`}
          >
            {loading ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>

          {isApplied && (
            <Badge className={`mt-1 text-white px-3 py-1 ${getStatusColor(userApplication?.status)}`}>
              Status: {userApplication?.status?.toUpperCase() || 'APPLIED'}
            </Badge>
          )}
        </div>
      </div>

      {/* Divider */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-8">Job Details</h2>

      {/* Job Details Section */}
      <div className="space-y-6 text-gray-700">
        <DetailRow label="Role" value={singleJob?.title} icon={<Briefcase className="w-5 h-5 text-[#6A38C2]" />} />
        <DetailRow label="Location" value={singleJob?.location} icon={<MapPin className="w-5 h-5 text-[#6A38C2]" />} />
        <DetailRow label="Description" value={singleJob?.description} icon={<FileText className="w-5 h-5 text-[#6A38C2]" />} />
        <DetailRow label="Experience" value={singleJob?.experience || 'Not Available'} icon={<Briefcase className="w-5 h-5 text-[#6A38C2]" />} />
        <DetailRow label="Salary" value={`₹${singleJob?.salary} LPA`} icon={<IndianRupee className="w-5 h-5 text-[#6A38C2]" />} />
        <DetailRow label="Applicants" value={singleJob?.applications?.length || 0} icon={<Users className="w-5 h-5 text-[#6A38C2]" />} />
        <DetailRow label="Posted On" value={singleJob?.createdAt?.split('T')[0]} icon={<CalendarDays className="w-5 h-5 text-[#6A38C2]" />} />
      </div>
    </div>
  );
};

// 🔹 Detail Row Component
const DetailRow = ({ label, value, icon }) => (
  <div className="flex gap-4 items-start">
    {icon && <div className="pt-1">{icon}</div>}
    <div className="w-32 font-semibold">{label}:</div>
    <div className="text-gray-900">{value}</div>
  </div>
);

export default JobDescription;

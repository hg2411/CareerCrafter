import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  MapPin,
  Users,
  Briefcase,
  IndianRupee,
  CalendarDays,
  FileText,
} from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [userApplication, setUserApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          applications: [
            ...(singleJob.applications || []),
            {
              ...newApp,
              applicant: user?._id,
            },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        setUserApplication({ ...newApp, applicant: user?._id });
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 409) {
        toast.info("You have already applied to this job.");
        const existing = singleJob?.applications?.find(
          (app) =>
            app.applicant?._id === user?._id || app.applicant === user?._id
        );
        setUserApplication(existing || null);
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong.");
      }
    }
  };

  const handleWithdraw = async () => {
    const confirm = window.confirm(
      "Are you sure you want to withdraw your application?"
    );
    if (!confirm) return;

    try {
      setLoading(true);
      const res = await axios.delete(
        `${APPLICATION_API_END_POINT}/withdraw/${jobId}`,
        { withCredentials: true }
      );
      setLoading(false);

      if (res.data.success) {
        toast.success("Application withdrawn successfully.");
        setUserApplication(null);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: singleJob.applications.filter(
              (app) =>
                app.applicant?._id !== user?._id && app.applicant !== user?._id
            ),
          })
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || "Failed to withdraw application."
      );
    }
  };

  const handleChatWithRecruiter = () => {
    if (singleJob?.created_by?._id) {
      navigate(`/chat/${singleJob.created_by._id}`);
    } else {
      toast.error("Recruiter information not available for this job.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const foundApplication = res.data.job.applications?.find(
            (app) =>
              app.applicant?._id === user?._id || app.applicant === user?._id
          );
          setUserApplication(foundApplication || null);
        }
      } catch (error) {
        console.log(error);
        toast.error("Job not found or has been removed.");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    if (singleJob?.applications && !userApplication) {
      const found = singleJob.applications.find(
        (app) => app.applicant?._id === user?._id || app.applicant === user?._id
      );
      if (found) {
        setUserApplication(found);
      }
    }
  }, [singleJob, user?._id]);

  const isApplied = !!userApplication;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12 mt-10 bg-white rounded-2xl shadow-xl">
       {/* 🔙 Back Button */}
{/* 🔙 Back Button */}
<Button
  onClick={() => navigate(-1)}
  className="mb-6 flex items-center gap-2 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all duration-200 group w-fit"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-white transition-transform duration-200 group-hover:-translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
  <span>Back</span>
</Button>



        {/* Title + Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white px-3 py-1">
                {singleJob?.position} Position
                {singleJob?.position > 1 ? "s" : ""}
              </Badge>
              <Badge className="bg-gradient-to-r from-[#F83002] to-[#FF5E3A] text-white px-3 py-1">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-gradient-to-r from-[#38A169] to-[#68D391] text-white px-3 py-1 flex items-center gap-1">
                <IndianRupee className="w-4 h-4" /> {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {isApplied ? (
              <>
                <Button
                  onClick={handleWithdraw}
                  disabled={loading}
                  className="bg-red-600 text-white hover:bg-red-700 font-semibold px-6 py-3 rounded-full"
                >
                  {loading ? "Withdrawing..." : "Withdraw Application"}
                </Button>
                <Badge
                  className={`mt-1 text-white px-3 py-1 ${getStatusColor(
                    userApplication?.status
                  )}`}
                >
                  Status: {userApplication?.status?.toUpperCase() || "APPLIED"}
                </Badge>
              </>
            ) : (
              <Button
                onClick={applyJobHandler}
                disabled={loading}
                className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white hover:opacity-90 font-semibold px-6 py-3 rounded-full"
              >
                {loading ? "Applying..." : "Apply Now"}
              </Button>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-8">
          Job Details
        </h2>

        <div className="space-y-6 text-gray-700">
          <DetailRow
            label="Role"
            value={singleJob?.title}
            icon={<Briefcase className="w-5 h-5 text-[#6A38C2]" />}
          />
          <DetailRow
            label="Location"
            value={singleJob?.location}
            icon={<MapPin className="w-5 h-5 text-[#6A38C2]" />}
          />
          <DetailRow
            label="Description"
            value={singleJob?.description}
            icon={<FileText className="w-5 h-5 text-[#6A38C2]" />}
          />
          <DetailRow
            label="Experience"
            value={singleJob?.experience || "Not Available"}
            icon={<Briefcase className="w-5 h-5 text-[#6A38C2]" />}
          />
          <DetailRow
            label="Salary"
            value={`₹${singleJob?.salary} LPA`}
            icon={<IndianRupee className="w-5 h-5 text-[#6A38C2]" />}
          />
          <DetailRow
            label="Applicants"
            value={singleJob?.applications?.length || 0}
            icon={<Users className="w-5 h-5 text-[#6A38C2]" />}
          />
          <DetailRow
            label="Posted On"
            value={singleJob?.createdAt?.split("T")[0]}
            icon={<CalendarDays className="w-5 h-5 text-[#6A38C2]" />}
          />
        </div>
      </div>

      {/* 🌟 Floating Chat with Recruiter Button */}
      <Button
        onClick={handleChatWithRecruiter}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-gradient-to-r from-[#38A169] to-[#68D391] text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-4A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        Chat with Recruiter
      </Button>
    </>
  );
};

const DetailRow = ({ label, value, icon }) => (
  <div className="flex gap-4 items-start">
    {icon && <div className="pt-1">{icon}</div>}
    <div className="w-32 font-semibold">{label}:</div>
    <div className="text-gray-900">{value}</div>
  </div>
);

export default JobDescription;

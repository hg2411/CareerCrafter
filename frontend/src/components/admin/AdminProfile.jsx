import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Briefcase, Mail, Calendar, Building2 } from "lucide-react";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import moment from "moment";

const AdminProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const { allAdminJobs } = useSelector((store) => store.job);
  useGetAllAdminJobs();

  const totalJobsPosted = allAdminJobs?.length || 0;
  const totalApplications = allAdminJobs?.reduce(
    (sum, job) => sum + (job?.applications?.length || 0),
    0
  );
  const interviewsScheduled = allAdminJobs?.reduce(
    (sum, job) =>
      sum +
      (job?.applications?.filter((app) => app?.status === "accepted").length || 0),
    0
  );

  const recentJobs = [...allAdminJobs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const recentApplications = allAdminJobs
    .flatMap((job) =>
      (job.applications || []).map((app) => ({
        label: `${app.applicant?.fullname || "Candidate"} applied for ${job.title}`,
        detail: `Status: ${app.status}`,
        createdAt: app.createdAt,
      }))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const recentActivity = [...recentJobs.map((job) => ({
        label: `Posted a new role: ${job.title}`,
        detail: `${job.company?.name || "Company"} · ${job.applications?.length || 0} applicant${
          (job.applications?.length || 0) === 1 ? "" : "s"
        }`,
        createdAt: job.createdAt,
      })),
      ...recentApplications,
    ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10 items-center">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 border shadow-md mb-4">
                <AvatarImage
                  src={user?.profile?.profilePhoto || "/default-avatar.png"}
                />
              </Avatar>
              <Button className="flex items-center gap-2">
                <Edit2 size={16} /> Edit Profile
              </Button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.fullname || "Recruiter Name"}
              </h1>
              <p className="text-gray-500 flex justify-center md:justify-start items-center gap-2">
                <Mail className="w-4 h-4" /> {user?.email}
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-gray-700 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">Company:</span>{" "}
                  {user?.profile?.companyName || "Not added"}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Role:</span> {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Total Jobs Posted" count={totalJobsPosted} />
            <StatCard title="Total Applications" count={totalApplications} />
            <StatCard title="Interviews Scheduled" count={interviewsScheduled} />
          </div>

          {/* Company Overview */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              {user?.profile?.companyDescription || "No company description provided."}
            </p>
          </div>

          {/* Recent Job Posts */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Job Posts</h2>
            <ul className="space-y-4">
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <li key={job._id} className="border-b pb-2 last:border-none flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                      <p className="text-gray-700 font-semibold">{job.title}</p>
                      <p className="text-sm text-gray-500">{job.company?.name || "Company"}</p>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {moment(job.createdAt).fromNow()} • {job.applications?.length || 0} applicant{job.applications?.length === 1 ? "" : "s"}
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center py-6">You haven't posted any jobs yet.</li>
              )}
            </ul>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recruiter Activity</h2>
            <ul className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="text-gray-700">{activity.label}</p>
                      <p className="text-sm text-gray-500">{activity.detail}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Recent activity will appear here once you post a job or receive applications.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ title, count }) => (
  <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
    <p className="text-gray-500">{title}</p>
    <h4 className="text-3xl font-bold text-blue-600">{count}</h4>
  </div>
);

export default AdminProfile;

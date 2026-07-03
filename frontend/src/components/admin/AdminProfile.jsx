import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar";
import { 
  Briefcase, 
  Mail, 
  Calendar, 
  Layers, 
  Users, 
  CheckCircle2, 
  Clock, 
  FileText,
  Inbox
} from "lucide-react";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import moment from "moment";

const AdminProfile = () => {
  useGetAllAdminJobs();
  const { user } = useSelector((store) => store.auth);
  const { allAdminJobs } = useSelector((store) => store.job);
  
  const [activeTab, setActiveTab] = useState("overview");

  
  // Dynamic Metrics Calculations
  const totalJobsPosted = allAdminJobs?.length || 0;
  
  const totalApplications = allAdminJobs?.reduce(
    (sum, job) => sum + (job?.applications?.length || 0),
    0
  );
  
  const interviewsScheduled = allAdminJobs?.reduce(
    (sum, job) =>
      sum +
      (job?.applications?.filter((app) => app?.status?.toLowerCase() === "accepted" || app?.status?.toLowerCase() === "selected").length || 0),
    0
  );

  const recentJobs = [...(allAdminJobs || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const recentApplications = (allAdminJobs || [])
    .flatMap((job) =>
      (job.applications || []).map((app) => ({
        label: `${app.applicant?.fullname || "Candidate"} applied for ${job.title}`,
        detail: `Status: ${app.status || "Pending"}`,
        createdAt: app.createdAt,
        type: "application"
      }))
    );

  const recentActivity = [
    ...(allAdminJobs || []).map((job) => ({
      label: `Posted a new role: ${job.title}`,
      detail: `${job.applications?.length || 0} applicant${(job.applications?.length || 0) === 1 ? "" : "s"}`,
      createdAt: job.createdAt,
      type: "job"
    })),
    ...recentApplications,
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-slate-50/50 min-h-screen text-slate-900 font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        
        {/* Modern Profile Header Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex flex-col items-center">
            <Avatar className="h-28 w-28 border-4 border-white shadow-xl ring-1 ring-slate-100 mb-4">
              <AvatarImage src={user?.profile?.profilePhoto || "/default-avatar.png"} alt="Avatar" />
            </Avatar>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3 z-10">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 capitalize mb-2">
                {user?.role || "Recruiter"} Portal
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {user?.fullname || "Recruiter Name"}
              </h1>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                <Mail className="w-4 h-4 text-slate-500" /> {user?.email}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                <Briefcase className="w-4 h-4 text-slate-500" /> Administrative Hub
              </span>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard 
            title="Total Jobs Posted" 
            count={totalJobsPosted} 
            icon={<Layers className="w-5 h-5 text-blue-600" />} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Total Applications" 
            count={totalApplications} 
            icon={<Users className="w-5 h-5 text-emerald-600" />} 
            color="bg-emerald-500"
          />
          <StatCard 
            title="Interviews Scheduled" 
            count={interviewsScheduled} 
            icon={<CheckCircle2 className="w-5 h-5 text-amber-600" />} 
            color="bg-amber-500"
          />
        </div>

        {/* Interactive Dashboard Workspace */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Custom Navigation Tabs */}
          <div className="flex border-b border-slate-100 px-6 bg-slate-50/50">
            {["overview", "recent jobs", "activity timeline"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 text-sm font-semibold border-b-2 transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Recruiter Profile Information</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Welcome to your main control center. From here you can manage posted jobs, keep an eye on fresh applications, and handle talent shortlists.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider mb-1">Account Role</span>
                    <span className="text-sm font-semibold text-slate-800 capitalize">{user?.role || "Recruiter"}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider mb-1">Registered Address</span>
                    <span className="text-sm font-semibold text-slate-800">{user?.email}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: RECENT JOBS */}
            {activeTab === "recent jobs" && (
              <div className="space-y-4 animate-fadeIn">
                {recentJobs.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {recentJobs.map((job) => (
                      <div key={job._id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group">
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition">
                            {job.title}
                          </h4>
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Posted {moment(job.createdAt).fromNow()}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-600 self-start sm:self-center">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.applications?.length || 0} applicant{(job.applications?.length || 0) === 1 ? "" : "s"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="You haven't posted any jobs yet." />
                )}
              </div>
            )}

            {/* TAB: ACTIVITY TIMELINE */}
            {activeTab === "activity timeline" && (
              <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 animate-fadeIn">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="relative group">
                      {/* Timeline dot */}
                      <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors ${
                        activity.type === "job" ? "bg-blue-500 group-hover:bg-blue-600" : "bg-emerald-500 group-hover:bg-emerald-600"
                      }`} />
                      
                      <div className="space-y-0.5">
                        <span className="text-xs text-slate-400 font-medium">
                          {moment(activity.createdAt).calendar()}
                        </span>
                        <p className="text-sm font-semibold text-slate-800 tracking-tight">
                          {activity.label}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activity.detail}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="-ml-6">
                    <EmptyState message="No recent operations or application movements found." />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

/* Reusable Dynamic Stat Card Component */
const StatCard = ({ title, count, icon, color }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group">
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
      <h4 className="text-3xl font-black text-slate-900 group-hover:scale-105 origin-left transition-transform duration-300">
        {count}
      </h4>
    </div>
    <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-slate-100/80 transition-colors`}>
      {icon}
    </div>
  </div>
);

/* Reusable Graphic Empty State */
const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-2xl bg-slate-50/50 border border-dashed border-slate-200">
    <div className="p-3 bg-white rounded-full border border-slate-100 shadow-sm text-slate-400 mb-3">
      <Inbox className="w-6 h-6" />
    </div>
    <p className="text-sm text-slate-500 max-w-xs">{message}</p>
  </div>
);

export default AdminProfile;
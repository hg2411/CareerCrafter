import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Trash2, MapPin, Calendar, Briefcase, DollarSign, ArrowUpRight, Sparkles, Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job, onRemove }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timedifference = currentTime - createdAt;
    return Math.floor(timedifference / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const alreadySaved = savedJobs.some((j) => j._id === job._id);
    setIsSaved(alreadySaved);
  }, [job]);

  const handleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!savedJobs.find((savedJob) => savedJob._id === job._id)) {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsSaved(true);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-[24px] shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 ease-out hover:-translate-y-1 w-full max-w-3xl mx-auto space-y-5">
      
      <div>
        {/* Top Meta Segment */}
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full px-2.5 py-1 border border-orange-200/30">
            <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
            <span className="text-[10px] font-bold tracking-wide">
              {daysAgoFunction(job?.createdAt) === 0
                ? "TODAY"
                : `${daysAgoFunction(job?.createdAt)} DAYS AGO`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Last Date Badge */}
            {job?.lastDate && !isNaN(new Date(job.lastDate)) && (
              <span className="inline-flex text-[10px] font-bold px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg uppercase tracking-wider">
                Ends: {new Date(job.lastDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </span>
            )}

            {/* Dynamic Interactive Save Icon Button */}
            <Button
              onClick={handleSave}
              disabled={isSaved}
              variant="outline"
              size="icon"
              className={`h-7 w-7 rounded-full transition-all duration-200 shadow-sm ${
                isSaved
                  ? "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white border-transparent cursor-default"
                  : "text-gray-400 hover:text-pink-600 hover:bg-pink-50 border-gray-200"
              }`}
              title={isSaved ? "Job Saved" : "Save for Later"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
            </Button>

            {/* Trash Button for removing saved jobs */}
            {isSaved && (
              <Button
                onClick={onRemove}
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full text-red-500 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 border-red-100 shadow-sm transition-all duration-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Company Branding Row */}
        <div className="flex items-center gap-3.5 mt-4">
          <Avatar className="block">
            <AvatarImage
              src={job?.company?.logo?.url}
              alt="Company Logo"
              className="w-11 h-11 object-cover rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 border border-gray-100 p-[2px] shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <AvatarFallback className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white font-black text-base flex items-center justify-center shadow-sm">
              {job?.company?.name?.[0] ?? "C"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="text-sm font-bold text-gray-800 tracking-tight line-clamp-1">
              {job?.company?.name || "Verified Enterprise"}
            </h4>
            <p className="text-[11px] text-gray-400 font-semibold flex items-center gap-1 mt-0.5 capitalize">
              <MapPin className="w-3 h-3 text-pink-500" />
              {job?.location || "Remote | India"}
            </p>
          </div>
        </div>

        {/* Content & Description Layout */}
        <div className="mt-4">
          <h3 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-600 transition-all duration-200 tracking-tight">
            {job?.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-gray-500 mt-2 leading-relaxed line-clamp-3">
            {job?.description}
          </p>
        </div>

        {/* Filter Pills Layout */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-500/5 text-orange-600 border border-orange-500/10 rounded-lg text-[10px] font-bold">
            <Briefcase className="w-3 h-3" />
            {job?.position || "0"} Positions
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-pink-500/5 text-pink-600 border border-pink-500/10 rounded-lg text-[10px] font-bold">
            <Calendar className="w-3 h-3" />
            {job?.jobType}
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/5 text-purple-600 border border-purple-500/10 rounded-lg text-[10px] font-bold">
            <DollarSign className="w-3 h-3" />
            {job?.salary} LPA
          </div>
        </div>
      </div>

      {/* Action Block Footer */}
      <div className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row items-center gap-3 w-full">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto sm:flex-1 h-9 rounded-xl text-[11px] font-bold bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all duration-200 shadow-sm"
        >
          View Job
          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </Button>

        <Button
          onClick={handleSave}
          disabled={isSaved}
          className={`w-full sm:w-auto sm:flex-1 h-9 font-bold text-[11px] rounded-xl shadow-sm transition-all duration-200 active:scale-95 ${
            isSaved
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white border-transparent"
          }`}
        >
          {isSaved ? "Saved" : "Save for Later"}
        </Button>
      </div>

    </div>
  );
};

export default Job;
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
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
    <div className="p-6 sm:p-7 md:p-8 rounded-2xl shadow hover:shadow-lg transition-shadow border border-gray-100 bg-gradient-to-br from-white to-gray-50 max-w-3xl mx-auto space-y-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
         {/* ✅ Last Date Badge */}
  {job?.lastDate && !isNaN(new Date(job.lastDate)) && (
    <Badge className="text-red-600 font-bold" variant="ghost">
      Last Date: {new Date(job.lastDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}
    </Badge>
  )}
        {/* Show remove trash only if isSaved is true */}
        {isSaved && (
          <Button
            onClick={onRemove}
            variant="outline"
            size="icon"
            className="rounded-full text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300 transition"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={job?.company?.logo?.url}
            alt="Company Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <AvatarFallback className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
            {job?.company?.name?.[0] ?? "C"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-semibold text-base sm:text-lg text-gray-800">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">Remote | India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">{job?.title}</h1>
        <p className="text-sm sm:text-base text-gray-600">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-yellow-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
        
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          View Job
        </Button>

        <Button
          onClick={handleSave}
          disabled={isSaved}
          className={`w-full sm:w-auto ${
            isSaved
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#6A38C2] text-white hover:bg-[#5c2aa0]"
          }`}
        >
          {isSaved ? "Saved" : "Save for Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;

import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timedifference = currentTime - createdAt;
    return Math.floor(timedifference / (1000 * 60 * 60 * 24));
  };

  const handleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const isAlreadySaved = savedJobs.find((savedJob) => savedJob._id === job._id);

    if (!isAlreadySaved) {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      alert("Job saved for later!");
    } else {
      alert("Job already saved.");
    }
  };

  return (
    <div className="p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg bg-white border border-gray-100 max-w-3xl mx-auto">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
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
          <h1 className="font-semibold text-base sm:text-lg">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">Remote | India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h1 className="font-bold text-lg sm:text-xl mb-2">{job?.tittle}</h1>
        <p className="text-sm sm:text-base text-gray-600">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
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
          className="bg-[#6A38C2] text-white hover:bg-[#5c2aa0] w-full sm:w-auto"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;

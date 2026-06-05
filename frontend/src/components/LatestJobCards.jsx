import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Sparkles, ArrowUpRight } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  
  // Console log left intact per requirements
  console.log("Job data:", job);
  if (!job) return null;

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group relative flex flex-col justify-between bg-white rounded-[24px] shadow-md hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer w-full"
    >
      <div>
        {/* Top Header Segment */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full px-2.5 py-1 border border-orange-200/30">
            <Sparkles className="w-3 h-3 mr-1 text-orange-500" />
            <span className="text-[10px] font-bold tracking-wide uppercase">HOT ROLE</span>
          </div>

          {/* Last Date Badge Styled as a high-fidelity meta-tag */}
          {job?.lastDate && !isNaN(new Date(job.lastDate)) && (
            <span className="inline-flex text-[10px] font-bold px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg uppercase tracking-wider">
              Ends: {new Date(job.lastDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric"
              })}
            </span>
          )}
        </div>

        {/* Company Identity Row */}
        <div className="flex items-center gap-3 mb-3">
          {/* Dynamic Avatar matching login section aesthetics */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            {job?.company?.name ? job.company.name.charAt(0).toUpperCase() : "J"}
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800 tracking-tight line-clamp-1">
              {job?.company?.name || "Verified Enterprise"}
            </h4>
            {/* Dynamic Location fallback reading from backend schema */}
            <p className="text-[11px] text-gray-400 font-semibold flex items-center gap-1 mt-0.5 capitalize">
              <MapPin className="w-3 h-3 text-pink-500" />
              {job?.location || "Remote | India"}
            </p>
          </div>
        </div>

        {/* Core Content Layer */}
        <div className="mb-4">
          <h3 className="text-base font-black text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-600 transition-all duration-200 line-clamp-1 tracking-tight">
            {job?.title}
          </h3>
          <p className="text-xs font-medium text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {job?.description}
          </p>
        </div>

        {/* Filter Badges Layout matching selections */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-500/5 text-orange-600 border border-orange-500/10 rounded-lg text-[10px] font-bold">
            <Briefcase className="w-3 h-3" />
            {job?.position || "0"} Positions
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-pink-500/5 text-pink-600 border border-pink-500/10 rounded-lg text-[10px] font-bold">
            <span className="w-1 h-1 rounded-full bg-pink-500" />
            {job?.jobType}
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/5 text-purple-600 border border-purple-500/10 rounded-lg text-[10px] font-bold">
            <DollarSign className="w-3 h-3" />
            {job?.salary} LPA
          </div>
        </div>
      </div>

      {/* Action Prompt Footer */}
      <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-gray-400 text-[10px] font-bold mt-4">
        <span className="text-gray-400 font-semibold">Click card to learn more</span>
        <span className="inline-flex items-center gap-0.5 text-[#6A38C2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
          Apply Now
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>

    </div>
  );
};

export default LatestJobCards;
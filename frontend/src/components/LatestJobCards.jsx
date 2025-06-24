import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Briefcase, DollarSign } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  if (!job) return null;

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
    >
      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="w-5 h-5 text-[#6A38C2]" />
        <h1 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h1>
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <h2 className="font-bold text-xl mb-2 text-gray-900">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <Badge className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white px-3 py-1 text-xs cursor-pointer">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-gradient-to-r from-[#F83002] to-[#FF5E3A] text-white px-3 py-1 text-xs cursor-pointer">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gradient-to-r from-[#38A169] to-[#68D391] text-white px-3 py-1 text-xs cursor-pointer flex items-center gap-1">
          <DollarSign className="w-4 h-4" /> {job?.salary} LPA
        </Badge>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
        <MapPin className="w-4 h-4" />
        India
      </div>
    </div>
  );
};

export default LatestJobCards;

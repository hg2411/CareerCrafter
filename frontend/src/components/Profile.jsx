import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Mail, Phone, Pen, FileText, Sparkles } from "lucide-react"; // using Phone icon instead of Contact
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { calculateProfileCompletion } from "@/utils/calculateProfileCompletion";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { percentage: completion } = calculateProfileCompletion(user);

  return (
    <div className="bg-gradient-to-br from-[#eef2f7] via-[#f6f9fc] to-[#eef2f7] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Sidebar */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-28 w-28 border-4 border-white shadow-md">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                className="rounded-full object-cover"
              />
            </Avatar>
            <h1 className="font-bold text-xl mt-4 text-gray-800">{user?.fullname}</h1>
            <p className="text-gray-500 text-sm mt-1">{user?.profile?.bio || "No bio available."}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" /> Skills
            </h2>
            {user?.profile?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.profile.skills.map((skill, idx) => (
                  <Badge key={idx} className="px-3 py-1 text-xs bg-purple-50 text-purple-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-xs">No skills added.</p>
            )}
          </div>

          {/* Profile Completion */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Profile Completion</h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{completion}% completed</p>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 mt-2 hover:bg-purple-50"
          >
            <Pen className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-600" />
                <span>{user?.email || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-600" />
                <span>{user?.phoneNumber || "Not provided"}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {user?.profile?.resume && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user.profile.resume}
                  className="flex items-center gap-2 text-blue-600 text-sm hover:underline"
                >
                  <FileText className="h-4 w-4" /> View Resume
                </a>
              )}
            </div>
          </div>

          {/* Applied Jobs */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Applied Jobs</h2>
            <AppliedJobTable />
          </div>
        </div>
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

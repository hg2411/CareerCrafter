import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { calculateProfileCompletion } from "@/utils/calculateProfileCompletion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { percentage: completion, missingFields } = calculateProfileCompletion(user);

  return (
    <div className="bg-gradient-to-br from-[#faf8ff] via-[#f6f3fc] to-[#fdfcff] min-h-screen pb-16">
      <Navbar />

      {/* Profile Header Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl mt-12 p-8 shadow-lg shadow-purple-100">

        {/* Profile Completion Bar */}
        <div className="mb-6 cursor-pointer" onClick={() => {
          if (completion < 100) setShowMissing(true);
        }}>
          <Label className="text-gray-700 font-semibold mb-2">
            Profile Completion: {completion}%
          </Label>
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          {completion < 100 && (
            <p className="text-xs text-red-500 mt-2">
              Click here to see what’s missing!
            </p>
          )}
        </div>

        {/* Modal for missing fields */}
        {showMissing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                onClick={() => setShowMissing(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h3 className="text-lg font-semibold mb-4">Complete Your Profile</h3>
              <p className="mb-3">To improve your chances, please add the following:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {missingFields.map((field, idx) => (
                  <li key={idx}>{field}</li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <Button onClick={() => { setShowMissing(false); setOpen(true); }}>
                  Update Profile Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Rest of your profile content */}
        <div className="flex justify-between items-start flex-col sm:flex-row gap-6">
          {/* Avatar & Info */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md shadow-purple-200">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                className="rounded-full object-cover"
              />
            </Avatar>
            <div>
              <h1 className="font-bold text-3xl text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-600 mt-2 max-w-sm">{user?.profile?.bio || "No bio available."}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-sm flex items-center gap-2 hover:bg-purple-50"
          >
            <Pen className="h-4 w-4" />
            Edit Profile
          </Button>
          {!user?.hasPassword && (
          <Button
            variant="outline"
            className="text-sm flex items-center gap-2 hover:bg-red-50 text-red-600 border-red-200"
            onClick={() => navigate("/set-password")}
          >
            <Pen className="h-4 w-4" />
            Set Password
          </Button>
        )}

        </div>

        {/* Contact Info */}
        <div className="border-t pt-6 mt-6 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-purple-600" />
            <span>{user?.email || "Email not provided"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="h-5 w-5 text-purple-600" />
            <span>{user?.phoneNumber || "Phone not provided"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
          {user?.profile?.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
                >
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills added.</p>
          )}
        </div>

        {/* Resume Upload and View */}
        <div className="mt-8">
          <Label className="text-md font-semibold mb-2 block text-gray-800">Resume</Label>

          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile.resume}
              className="text-blue-600 hover:underline font-medium"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-500 block mb-2">No resume uploaded.</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

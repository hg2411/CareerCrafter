import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import Navbar from "../shared/Navbar";

const AdminProfile = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Recruiter Profile</h2>

        <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-xl p-6 gap-6">
          <Avatar className="h-24 w-24 border border-gray-300 shadow">
            <AvatarImage
              src={user?.profile?.profilePhoto || "/default-avatar.png"}
            />
          </Avatar>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-800">
              {user?.fullname}
            </h3>
            <p className="text-gray-500">{user?.email}</p>
            <p className="mt-1 text-gray-600">
              Company: {user?.profile?.companyName || "Not added"}
            </p>
            <p className="text-gray-600">Role: {user?.role}</p>

            <div className="mt-4">
              <Button className="flex items-center gap-2">
                <Edit2 size={16} /> Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Example stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <p className="text-gray-600">Total Jobs Posted</p>
            <h4 className="text-2xl font-semibold text-blue-600">12</h4>
          </div>
          <div className="p-4 bg-white shadow rounded-lg text-center">
            <p className="text-gray-600">Active Applications</p>
            <h4 className="text-2xl font-semibold text-blue-600">58</h4>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default AdminProfile;

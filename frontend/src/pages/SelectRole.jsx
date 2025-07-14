import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { FaUserGraduate, FaBuilding } from "react-icons/fa";

const SelectRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/auth/me",
          { withCredentials: true }
        );
        const user = res.data?.user;
        dispatch(setUser(user));

        if (user?.role && user?.hasPassword) {
          if (user.role === "student") navigate("/");
          else navigate("/admin/companies");
        } else {
          setCheckingUser(false);
        }
      } catch (error) {
        console.error("User not logged in or error:", error);
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate, dispatch]);

  const handleCreateAccount = async () => {
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/auth/set-role-and-password",
        { role: selectedRole, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (selectedRole === "student") navigate("/");
        else navigate("/admin/companies");
      }
    } catch (error) {
      console.error("Failed to set role & password:", error.response || error);
      alert(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex max-w-4xl w-full">
          {/* Left hero gradient section */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#8B5CF6] to-[#D946EF] text-white flex-col justify-center items-center p-8">
            <h2 className="text-4xl font-bold mb-3">Select Your Role 🎓</h2>
            <p className="text-center text-sm max-w-xs mb-2">
              Choose to continue as Student or Recruiter.
            </p>
            <p className="text-center text-xs text-purple-100 max-w-xs">
              This helps us tailor your experience.
            </p>
          </div>

          {/* Right form section */}
          <div className="flex-1 p-8 sm:p-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white p-4 rounded-full shadow-md">
                <FaUserGraduate className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Complete Your Profile
            </h1>
            <p className="text-gray-500 text-center text-sm mb-6 max-w-xs mx-auto">
              Select your role and create a password to get started.
            </p>

            <div className="grid grid-cols-2 gap-5 mb-6">
              <div
                onClick={() => setSelectedRole("student")}
                className={`cursor-pointer border-2 rounded-2xl p-5 flex flex-col items-center transition-all ${
                  selectedRole === "student"
                    ? "border-purple-600 bg-purple-50 shadow-md"
                    : "border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                }`}
              >
                <FaUserGraduate size={36} className="mb-2 text-purple-600" />
                <span className="font-semibold text-gray-700">Student</span>
              </div>
              <div
                onClick={() => setSelectedRole("recruiter")}
                className={`cursor-pointer border-2 rounded-2xl p-5 flex flex-col items-center transition-all ${
                  selectedRole === "recruiter"
                    ? "border-green-600 bg-green-50 shadow-md"
                    : "border-gray-200 hover:border-green-400 hover:bg-green-50"
                }`}
              >
                <FaBuilding size={36} className="mb-2 text-green-600" />
                <span className="font-semibold text-gray-700">Recruiter</span>
              </div>
            </div>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />

            <button
              onClick={handleCreateAccount}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            onClick={() => setSelectedRole("student")}
            className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center transition ${
              selectedRole === "student"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            <FaUserGraduate size={32} className="mb-2 text-purple-600" />
            <span className="font-semibold">Student</span>
          </div>
          <div
            onClick={() => setSelectedRole("recruiter")}
            className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center transition ${
              selectedRole === "recruiter"
                ? "border-green-600 bg-green-50"
                : "border-gray-300 hover:border-green-400"
            }`}
          >
            <FaBuilding size={32} className="mb-2 text-green-600" />
            <span className="font-semibold">Recruiter</span>
          </div>
        </div>

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        
        <button
          onClick={handleCreateAccount}
          disabled={loading}
          className="bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition w-full disabled:opacity-50"
        >
          {loading ? "Processing..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default SelectRole;

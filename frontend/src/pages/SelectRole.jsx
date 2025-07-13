import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const SelectRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = async (role) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/set-role",
        { role },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // ✅ Update Redux
        if (role === "student") {
          navigate("/"); // Student dashboard
        } else {
          navigate("/admin/companies"); // Recruiter dashboard
        }
      }
    } catch (error) {
      console.error("Role selection failed:", error.response || error);
      alert(
        error?.response?.data?.message || "Failed to set role. Please try again."
      );
    }
  };

  // Optional: Redirect if role already exists (session already updated)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });

        const role = res.data?.user?.role;
        if (role) {
          if (role === "student") navigate("/");
          else navigate("/admin/companies");
        }
      } catch (error) {
        console.error("Not logged in or no role set:", error);
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg p-10 rounded-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Choose Your Role</h2>
        <div className="flex flex-col gap-5">
          <button
            onClick={() => handleSelect("student")}
            className="bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition"
          >
            I'm a Student
          </button>
          <button
            onClick={() => handleSelect("recruiter")}
            className="bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
          >
            I'm a Recruiter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;

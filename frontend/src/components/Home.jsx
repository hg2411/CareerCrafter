import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
import CategoryCarousel from "./CategoryCarousel.jsx";
import LatestJobs from "./LatestJobs.jsx";
import Navbar from "./shared/Navbar.jsx";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="w-full bg-white text-gray-900">
      {/* ✅ Navbar at the top */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 gap-12 bg-gradient-to-br from-white to-[#f1f5ff]">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Find the <span className="text-blue-600">Right Job</span> for You
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto md:mx-0">
            CareerCrafter helps you discover the best opportunities across industries. One click closer to your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/jobs")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
            >
              Browse Jobs
            </button>
            <button
              onClick={() => navigate("/browse")}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium"
            >
              Explore Categories
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="src/assets/man-riding-a-rocket.svg"
            alt="Career Illustration"
            className="w-[80%] max-w-md"
          />
        </div>
      </section>

      {/* ✅ Category Section (only once) */}
      <section className="py-20 px-6 md:px-24 bg-[#f9fafb] text-center border-t border-gray-200">
        <h2 className="text-4xl font-bold mb-12">Browse Job Categories</h2>
        <CategoryCarousel />
      </section>

      {/* ✅ Latest Jobs Section (only once) */}
      <section className="py-20 px-6 md:px-24 bg-white text-center border-t border-gray-200">
        <h2 className="text-4xl font-bold mb-12">Latest Jobs</h2>
        <LatestJobs />
        <div className="mt-10">
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
          >
            View All Jobs
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

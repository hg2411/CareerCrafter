import React, { useEffect } from "react";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel.jsx";
import LatestJobs from "./LatestJobs.jsx";

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
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 to-blue-100">
      {/* Hero Section */}
      <section className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
            Craft Your <span className="text-blue-600">Career</span> with Us
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Find your dream job or the perfect candidate effortlessly. Connect, apply, and succeed with CareerCrafter.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <button
              onClick={() => navigate("/jobs")}
              className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
            >
              Find Jobs
            </button>
            <button
              onClick={() => navigate("/browse")}
              className="bg-gray-200 text-gray-800 py-3 px-8 rounded-full font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105 shadow-md"
            >
              Browse Categories
            </button>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0 flex justify-center">
          <img
            src="src/assets/man-riding-a-rocket.svg"
            alt="Career Illustration"
            className="w-96 h-auto"
          />
        </div>
      </section>

      {/* Category Section */}
      <section className="w-full bg-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Browse Job Categories</h2>
        <CategoryCarousel />
      </section>

      {/* Latest Jobs Section */}
      <section className="w-full bg-gray-100 py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Latest Jobs</h2>
        <LatestJobs />
        <div className="mt-12">
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
          >
            View All Jobs
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

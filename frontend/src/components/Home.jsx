import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
import Navbar from "./shared/Navbar.jsx";
import CategoryCarousel from "./CategoryCarousel.jsx";
import LatestJobs from "./LatestJobs.jsx";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-300 rounded-full blur-3xl opacity-30"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 max-w-3xl">
          Find Your <span className="text-yellow-200">Dream Job</span> with CareerCrafter
        </h1>
        <p className="text-white/90 max-w-2xl mb-8">
          Search thousands of openings, explore categories and land the career you love.
        </p>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-2xl rounded-full overflow-hidden shadow-lg bg-white">
          <input
            type="text"
            placeholder="Search job title, company, skills..."
            className="flex-grow px-4 py-3 text-gray-700 outline-none bg-transparent"
          />
          <Button className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white rounded-none rounded-r-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/jobs")}
            className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 shadow-md"
          >
            Browse Jobs
          </Button>
          <Button
            onClick={() => navigate("/browse")}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#6A38C2] px-6 py-3 rounded-full font-semibold"
          >
            Explore Categories
          </Button>
        </div>
      </section>

      {/* ✅ Stats */}
      <section className="py-16 px-6 md:px-24 bg-white grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { count: "20K+", label: "Jobs Posted" },
          { count: "5K+", label: "Recruiters" },
          { count: "50K+", label: "Active Users" }
        ].map((item, idx) => (
          <div key={idx} className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-md py-8">
            <h3 className="text-4xl font-bold text-[#6A38C2]">{item.count}</h3>
            <p className="text-gray-700 mt-2">{item.label}</p>
          </div>
        ))}
      </section>

      {/* ✅ Categories */}
      <section className="py-20 px-6 md:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Popular Categories</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CategoryCarousel />
        </div>
      </section>

      {/* ✅ Latest Jobs */}
      <section className="py-20 px-6 md:px-24 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Latest Jobs</h2>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <LatestJobs />
        </div>
        <div className="mt-10 text-center">
          <Button
            onClick={() => navigate("/jobs")}
            className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            View All Jobs
          </Button>
        </div>
      </section>

      {/* ✅ Testimonials */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Users Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { name: "Alex", text: "CareerCrafter helped me land my dream role!" },
            { name: "Priya", text: "As a recruiter, it’s the simplest hiring tool I’ve used." },
            { name: "John", text: "Clean design, lots of opportunities!" }
          ].map((t, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl shadow-md p-6 text-gray-700">
              <p>“{t.text}”</p>
              <h4 className="mt-4 font-semibold text-[#6A38C2]">— {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ CTA (only if user NOT logged in) */}
      {!user && (
        <section className="py-20 px-6 md:px-24 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start?</h2>
          <p className="mb-8 text-lg">Join CareerCrafter and discover thousands of opportunities today.</p>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-white text-[#6A38C2] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
          >
            Get Started
          </Button>
        </section>
      )}
    </div>
  );
};

export default Home;

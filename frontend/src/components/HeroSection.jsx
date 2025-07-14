import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import CareerIllustration from "../assets/career-illustration.svg"; // Update with actual path

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() !== "") {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Craft Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Career</span> with Us
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-xl mx-auto md:mx-0">
            Find your dream job or the perfect candidate effortlessly. Connect, apply, and succeed with CareerCrafter.
          </p>

          {/* Search Bar */}
          <div className="flex items-center w-full max-w-xl mx-auto md:mx-0 rounded-full shadow-lg border border-gray-200 bg-white overflow-hidden">
            <input
              type="text"
              placeholder="Search your next big opportunity"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-3 text-sm text-gray-700 outline-none bg-transparent"
            />
            <Button
              onClick={searchJobHandler}
              type="submit"
              className="h-full px-4 rounded-none bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white"
              style={{ borderRadius: "0 9999px 9999px 0" }}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start">
            <Button
              onClick={() => navigate("/jobs")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full text-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              Find Jobs
            </Button>
            <Button
              onClick={() => navigate("/browse")}
              variant="outline"
              className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full text-lg transition-all"
            >
              Browse Categories
            </Button>
          </div>
        </div>

        {/* Right Content - Illustration */}
        <div className="flex-1 flex justify-center">
          <img
            src={CareerIllustration}
            alt="Career Illustration"
            className="w-[80%] max-w-md drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import CareerIllustration from "../assets/career-illustration.svg"; // Use your image path

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
    <section className="bg-[#f4f3ff] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">

          {/* Search Bar - On Top */}
          <div className="flex items-center w-full max-w-xl mx-auto md:mx-0 rounded-full shadow-md border border-gray-300 bg-white overflow-hidden mb-8">
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
              <Search className="h-6 w-6" />
            </Button>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight">
            Craft Your <span className="text-blue-600">Career</span> with Us
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-xl mx-auto md:mx-0">
            Find your dream job or the perfect candidate effortlessly.
            Connect, apply, and succeed with CareerCrafter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Button
              onClick={() => navigate("/jobs")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg transition-all"
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
          <img src={CareerIllustration} alt="Career Illustration" className="w-96 h-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

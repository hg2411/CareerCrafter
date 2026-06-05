import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import CareerIllustration from "../assets/career-illustration.png";

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
    <section className="relative py-24 bg-gradient-to-br from-white via-[#F4F1FB] to-white overflow-hidden">
      {/* Refined decorative blobs matching the illustration colors */}
      <div className="absolute top-[-50px] left-[-100px] w-[350px] h-[350px] bg-[#E3E8FF] rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-[#E3E8FF] rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 relative z-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#1A1A1A]">
            Navigate Your <span className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-transparent bg-clip-text">Future</span> with Confidence
          </h1>

          {/* Description */}
          <p className="text-[#555555] text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            From discovering listings to finalizing offers, manage every step of your career journey. Connect, apply, and thrive with CareerCrafter.
          </p>

          {/* Enhanced Search Bar */}
          <div className="flex items-center w-full max-w-xl mx-auto lg:mx-0 rounded-full shadow-xl border border-[#E0E0E0] bg-white overflow-hidden p-1">
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-6 py-4 text-lg text-[#333] outline-none bg-transparent placeholder:text-[#A0A0A0]"
            />
            <Button
              onClick={searchJobHandler}
              type="submit"
              className="h-14 w-14 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white flex items-center justify-center p-0 ml-2"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10 justify-center lg:justify-start">
            <Button
              onClick={() => navigate("/jobs")}
              className="px-10 py-4 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:from-[#5A2FB0] hover:to-[#8E44AD] text-white rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Explore Opportunities
            </Button>
            <Button
              onClick={() => navigate("/browse")}
              variant="outline"
              className="px-10 py-4 border-2 border-[#DCDCDC] text-[#444] hover:bg-[#F8F9FA] rounded-full text-lg font-semibold transition-all"
            >
              Browse Categories
            </Button>
          </div>
        </div>

        {/* Right Content - The New Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={CareerIllustration}
            alt="Career journey from job search to offer accepted"
            className="w-full max-w-2xl lg:max-w-none drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
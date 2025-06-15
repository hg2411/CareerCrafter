import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
  }
  return (
    <div className="flex flex-col gap-5 my-10 text-center">
  <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
    Your Career Starts Here
  </span>
  <h1 className="text-5xl font-bold">
    Discover, Apply & <br /> Land Your <span className="text-[#6A38C2]">Dream Job</span>
  </h1>
  <p>Explore top opportunities and take the next step in your career journey with us.</p>
  
  <div className="flex items-center w-full max-w-xl mx-auto rounded-full shadow-md border border-gray-300 bg-white overflow-hidden">
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
      style={{ borderRadius: '0 9999px 9999px 0' }}
    >
      <Search className="h-7 w-5" />
    </Button>
  </div>
</div>

  );
};

export default HeroSection;

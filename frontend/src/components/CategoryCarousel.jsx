import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Code, Database, PenTool, Layers, Monitor } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const category = [
  { name: "Frontend Developer", icon: <Monitor className="w-5 h-5" />, color: "from-[#6A38C2] to-[#9D50BB]" },
  { name: "Backend Developer", icon: <Database className="w-5 h-5" />, color: "from-[#4FD1C5] to-[#2C7A7B]" },
  { name: "Data Science", icon: <Layers className="w-5 h-5" />, color: "from-[#F6AD55] to-[#DD6B20]" },
  { name: "Graphic Designer", icon: <PenTool className="w-5 h-5" />, color: "from-[#FC8181] to-[#E53E3E]" },
  { name: "FullStack Developer", icon: <Code className="w-5 h-5" />, color: "from-[#68D391] to-[#38A169]" }
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 15 },
  });

  // Auto-scroll effect
  useEffect(() => {
    let interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [instanceRef]);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 my-20">
      <h2 className="text-3xl font-extrabold text-center mb-10">Browse Job Categories</h2>

      <div ref={sliderRef} className="keen-slider">
        {category.map((cat, index) => (
          <div key={index} className="keen-slider__slide flex justify-center p-4">
            <Button
              onClick={() => searchJobHandler(cat.name)}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r ${cat.color} text-white text-lg hover:opacity-90 transition-all shadow-lg`}
            >
              {cat.icon} {cat.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;

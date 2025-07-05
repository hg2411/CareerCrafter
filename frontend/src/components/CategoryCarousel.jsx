import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Code, Database, PenTool, Layers, Monitor } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const category = [
  { name: "Frontend Developer", icon: <Monitor className="w-4 h-4" />, color: "from-purple-500 to-purple-700" },
  { name: "Backend Developer", icon: <Database className="w-4 h-4" />, color: "from-teal-500 to-teal-700" },
  { name: "Data Science", icon: <Layers className="w-4 h-4" />, color: "from-orange-400 to-orange-600" },
  { name: "Graphic Designer", icon: <PenTool className="w-4 h-4" />, color: "from-red-400 to-red-600" },
  { name: "FullStack Developer", icon: <Code className="w-4 h-4" />, color: "from-green-400 to-green-600" },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 12 },
    breakpoints: {
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 480px)": { slides: { perView: 1.5, spacing: 8 } },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 2500);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="max-w-6xl mx-auto px-2 my-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
        Browse Job Categories
      </h2>

      <div ref={sliderRef} className="keen-slider">
        {category.map((cat, index) => (
          <div key={index} className="keen-slider__slide flex justify-center">
            <Button
              onClick={() => searchJobHandler(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm md:text-base hover:opacity-90 transition-all duration-200`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;

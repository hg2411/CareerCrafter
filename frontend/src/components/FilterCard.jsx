import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const changeHandler = (group, value) => {
    const updated = { ...selectedFilters, [group]: value };
    setSelectedFilters(updated);
    console.log(`Selected [${group}]: ${value}`);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    dispatch(setSearchedQuery({}));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xs border">
      <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>
      <hr className="mb-4" />
      {filterData.map((group, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{group.filterType}</h3>
          <div className="space-y-2">
            {group.array.map((item, idx) => {
              const id = `${group.filterType}-${idx}`;
              return (
                <label key={id} htmlFor={id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    id={id}
                    name={group.filterType}
                    value={item}
                    checked={selectedFilters[group.filterType] === item}
                    onChange={() => changeHandler(group.filterType, item)}
                    className="cursor-pointer"
                  />
                  <span className="text-sm text-gray-800">{item}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterCard;

import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";

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
    array: ["0-40K", "41k-1 lakh", "1lakh-5lakhs"],
  },
];

const FilterCard = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Filter Jobs</h1>
      <hr className="my-3" />
      {filterData.map((data, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{data.filterType}</h2>
          <RadioGroup className="space-y-2">
            {data.array.map((item, index) => {
              const id = `${data.filterType}-${index}`;
              return (
                <div key={id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item}
                    id={id}
                    className="
                      w-5 h-5 rounded-full border-2 border-gray-600
                      flex items-center justify-center
                      focus:outline-none focus:ring-2 focus:ring-black
                    "
                  >
                    {/* Dot only shows when selected */}
                    <div className="w-2 h-2 rounded-full bg-black data-[state=unchecked]:hidden" />
                  </RadioGroupItem>
                  <Label htmlFor={id}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;

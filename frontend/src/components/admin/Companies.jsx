import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";

const Companies = () =>  {
  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-72" placeholder="Filter by name" />
          <Button className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:opacity-90 transition duration-300">
            New Company
          </Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies;

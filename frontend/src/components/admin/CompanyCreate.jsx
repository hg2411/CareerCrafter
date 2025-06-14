import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
   } catch (error) {
  console.error("Company registration failed:", error);
  console.log("Backend error response:", error?.response?.data); // 👈 ADD THIS
  toast.error(error?.response?.data?.message || "Something went wrong while creating company.");
}

  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create a Company</h1>
          <p className="text-gray-600 text-sm">
            What would you like to name your company?
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="companyName" className="text-gray-700 font-medium">
            Company Name
          </Label>
          <Input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Microsoft"
            className="py-3 px-4 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white font-semibold hover:opacity-90 transition duration-300"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;

import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: 0,
    position: 0,
    companyId: "",
    lastDate: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies = [] } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectCompany) {
      setInput({ ...input, companyId: selectCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Clean payload
      const payload = {
        title: input.title.trim(),
        description: input.description.trim(),
        requirements: input.requirements.trim(),
        salary: Number(input.salary),
        location: input.location.trim(),
        jobType: input.jobType.trim(),
        experience: Number(input.experience),
        position: Number(input.position),
        companyId: input.companyId,
        lastDate: input.lastDate,
      };

      console.log("Cleaned Job Payload:", payload); // Final payload

      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center py-10 px-4 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200"
        >
          <h2 className="md:col-span-2 text-2xl font-bold text-gray-800 mb-4 text-center">
            Post a New Job Opening
          </h2>

          {/* Form Fields */}
          <div>
            <Label className="text-gray-600">Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div>
            <Label className="text-gray-600">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="Brief job description"
              required
            />
          </div>

          <div>
            <Label className="text-gray-600">Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. React, Node.js"
            />
          </div>

          <div>
            <Label className="text-gray-600">Salary</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. 10 LPA"
            />
          </div>

          <div>
            <Label className="text-gray-600">Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. Bangalore"
            />
          </div>

          <div>
            <Label className="text-gray-600">Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. Full-Time"
            />
          </div>

          <div>
            <Label className="text-gray-600">Experience</Label>
            <Input
              type="number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. 2+ years"
            />
          </div>

          <div>
            <Label className="text-gray-600">Open Positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. 5"
            />
          </div>
          <div>
            <Label className="text-gray-600">Last Date to Apply</Label>
            <Input
              type="date"
              name="lastDate"
              value={input.lastDate}
              onChange={changeEventHandler}
              className="my-1"
              min={new Date().toISOString().split("T")[0]} // 👈 today's date in YYYY-MM-DD
              required
            />
          </div>
          {/* Select Company */}
          <div>
            <Label className="text-gray-600">Select Company</Label>
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md z-50">
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem
                      key={company._id}
                      value={company.name.toLowerCase()}
                      className="text-sm cursor-pointer hover:bg-purple-100"
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button and Company Check */}
          <div className="md:col-span-2 mt-4 flex flex-col items-center gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-semibold py-2 rounded-full transition-all flex items-center justify-center"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Please Wait" : "Post a new job"}
            </Button>

            {companies.length === 0 && (
              <p className="text-sm text-red-600 font-semibold text-center mt-2">
                ⚠️ Please register a company before posting a job.
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default PostJob;

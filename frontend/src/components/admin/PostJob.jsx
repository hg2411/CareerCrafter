import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const companyArray = []; // Just placeholder - no backend

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    positions: 0,
    companyId: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", input);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-10 px-4 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200"
        >
          <h2 className="md:col-span-2 text-2xl font-bold text-gray-800 mb-4 text-center">
            Post a New Job Opening
          </h2>

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
              name="requirement"
              value={input.requirement}
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
              type="text"
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
              name="positions"
              value={input.positions}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="e.g. 5"
            />
          </div>

          <div>
            <Label className="text-gray-600">Company ID</Label>
            <Input
              type="text"
              name="companyId"
              value={input.companyId}
              onChange={changeEventHandler}
              className="my-1"
              placeholder="Company ID"
              required
            />
          </div>

          <div className="md:col-span-2 mt-4 flex flex-col items-center gap-2">
            <Button
              type="submit"
              className="w-full md:w-3/4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-base font-semibold rounded-xl transition duration-300 shadow-md"
            >
              Post Job
            </Button>

            {companyArray.length === 0 && (
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

import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          action=""
          className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-lg p-6 my-10"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>

          <div className="mb-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="NAME"
              className="mt-1 shadow-sm rounded-md"
            />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abc123@gmail.com"
              className="mt-1 shadow-sm rounded-md"
            />
          </div>

          <div className="mb-4">
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="XXX-XXX-XXXX"
              className="mt-1 shadow-sm rounded-md"
            />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="********"
              className="mt-1 shadow-sm rounded-md"
            />
          </div>

          <div className="flex items-center justify-between mb-6 gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label className="cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label className="cursor-pointer">Recruiter</Label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer file:mr-2 file:py-1 file:px-2 file:border-0 file:rounded file:bg-gray-100 file:text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800 focus:ring-4 focus:ring-blue-700 font-medium py-2 rounded"
          >
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

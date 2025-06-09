import Navbar from "../shared/Navbar";
import React, { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/authSlice";

import { USER_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: name === "role" ? value.toLowerCase() : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      // Use the imported USER_API_END_POINT instead of env variable
      const res = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // to handle cookies/sessions
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Something went wrong during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-lg p-6 my-10"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abc123@gmail.com"
              className="mt-1 shadow-sm rounded-md"
            />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
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
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="cursor-pointer">Recruiter</Label>
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full  my -4">
              <Loader2 className="mr-2  h-4 w-4  animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gray-900 text-white hover:bg-gray-800 focus:ring-4 focus:ring-blue-700 font-medium py-2 rounded"
            >
              Login
            </Button>
          )}
          <span className="text-sm block text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { USER_API_END_POINT } from "../../utils/constant";

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
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { email, password, role } = input;

    // 🔴 Form validation
    if (!email || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
      }

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8 mt-10"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h1>

          <div className="mb-5">
            <Label className="text-gray-700 font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abc123@gmail.com"
              className="mt-2 shadow-sm rounded-md"
            />
          </div>

          <div className="mb-5">
            <Label className="text-gray-700 font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-2 shadow-sm rounded-md"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-gray-600 text-sm">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                Student
              </label>
              <label className="flex items-center gap-2 text-gray-600 text-sm">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                Recruiter
              </label>
            </div>
          </div>

          {loading ? (
            <Button className="w-full bg-[#6A38C2] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full transition-all"
            >
              Login
            </Button>
          )}

          <p className="text-center text-sm mt-5 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#6A38C2] font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

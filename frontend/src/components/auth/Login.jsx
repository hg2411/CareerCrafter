import React, { useState, useEffect } from "react";
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
import { SiGoogle } from "react-icons/si";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const submitHandler = async (e) => {
    e.preventDefault();

    const { email, password, role } = input;

    if (!email || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
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

 useEffect(() => {
  if (user && window.location.pathname === "/login") {
    navigate("/", { replace: true });
  }
}, []);

  const googleLoginHandler = () => {
    console.log("Redirecting to Google...");
    window.location.href = "http://localhost:8000/api/v1/user/auth/google";
  };

  const roles = ["student", "recruiter"];

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
              {roles.map((roleOption) => (
                <label key={roleOption} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                  <Input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={input.role === roleOption}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {loading ? (
            <Button className="w-full bg-[#6A38C2] text-white" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full transition-all"
              disabled={loading}
            >
              Login
            </Button>
          )}

          {/* Divider */}
          <div className="my-4 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login Button */}
          <Button
            type="button"
            onClick={googleLoginHandler}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <SiGoogle className="w-4 h-4" />
            Login with Google
          </Button>

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

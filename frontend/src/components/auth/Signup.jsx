import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading } from "@/redux/authSlice";
import { SiGoogle } from "react-icons/si";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const submitHandler = async (e) => {
    e.preventDefault();

    const { fullname, email, phoneNumber, password, role } = input;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("role", role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT.replace(/\/$/, "")}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const googleSignupHandler = () => {
    window.location.href = "http://localhost:8000/auth/google";
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
            Create Account 📝
          </h1>

          <div className="mb-4">
            <Label className="text-gray-700">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Your Name"
              className="mt-1 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abc123@gmail.com"
              className="mt-1 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <Label className="text-gray-700">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="XXXXXXXXXX"
              className="mt-1 shadow-sm"
            />
          </div>

          <div className="mb-4">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-1 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-6 items-center">
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

            <div className="flex items-center gap-2">
              <Label className="text-gray-700">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer file:mr-2 file:py-1 file:px-2 file:border-0 file:rounded file:bg-gray-100 file:text-sm"
              />
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
            >
              Sign Up
            </Button>
          )}

          {/* Divider */}
          <div className="my-4 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Signup Button */}
          <Button
            type="button"
            onClick={googleSignupHandler}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <SiGoogle className="w-4 h-4" />
            Sign Up with Google
          </Button>

          <p className="text-center text-sm mt-5 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6A38C2] font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

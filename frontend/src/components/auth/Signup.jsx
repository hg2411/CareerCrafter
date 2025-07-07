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
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: fill form & send otp, 2: enter otp

  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const sendOtpHandler = async (e) => {
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

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/send-otp`,
        { email },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2); // move to OTP input
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const verifyAndRegisterHandler = async (e) => {
    e.preventDefault();
    const { fullname, email, phoneNumber, password, role } = input;

    if (!otp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }

    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("otp", otp);
      if (input.file) formData.append("file", input.file);

      const res = await axios.post(
        `${USER_API_END_POINT}/verify-otp-register`,
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
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
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
          onSubmit={step === 1 ? sendOtpHandler : verifyAndRegisterHandler}
          className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8 mt-10"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account 📝
          </h1>

          {/* Step 1: Fill details */}
          <div className="mb-4">
            <Label className="text-gray-700">Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="abc123@gmail.com"
            />
          </div>
          <div className="mb-4">
            <Label className="text-gray-700">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="XXXXXXXXXX"
            />
          </div>
          <div className="mb-4">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          <div className="flex gap-6 mb-4">
            {roles.map((roleOption) => (
              <label key={roleOption} className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value={roleOption}
                  checked={input.role === roleOption}
                  onChange={changeEventHandler}
                />
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
              </label>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Label className="text-gray-700">Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
            />
          </div>

          {/* Step 2: OTP input */}
          {step === 2 && (
            <div className="mb-4">
              <Label className="text-gray-700">Enter OTP</Label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
              />
            </div>
          )}

          {loading ? (
            <Button className="w-full bg-[#6A38C2] text-white" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full transition-all"
            >
              {step === 1 ? "Send OTP" : "Verify & Register"}
            </Button>
          )}

          {/* Divider */}
          <div className="my-4 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <Button
            type="button"
            onClick={googleSignupHandler}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-full flex items-center justify-center gap-2"
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

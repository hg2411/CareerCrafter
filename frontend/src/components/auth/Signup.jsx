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
  const [step, setStep] = useState(1);

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
        `${USER_API_END_POINT}/register/send-otp`,
        { email },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2);
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

    if (!otp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      formData.append("otp", otp);

      const res = await axios.post(
        `${USER_API_END_POINT}/register/verify-otp`,
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
    window.location.href = "http://localhost:8000/api/v1/user/auth/google";
  };

  const roles = ["student", "recruiter"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex max-w-4xl w-full">
          {/* Left hero section */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#8B5CF6] to-[#D946EF] text-white flex-col justify-center items-center p-8">
            <h2 className="text-3xl font-bold mb-3">Join Us Today! 🚀</h2>
            <p className="text-center text-sm max-w-xs mb-2">
              Create your free account and get started in seconds.
            </p>
            <p className="text-center text-xs text-purple-100 max-w-xs">
              We’re excited to have you! Build your profile, connect, and explore endless possibilities.
            </p>
          </div>

          {/* Right form */}
          <div className="flex-1 p-8 sm:p-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {step === 1 ? "Step 1: Fill Details" : "Step 2: Enter OTP"}
            </h1>

            <form
              onSubmit={step === 1 ? sendOtpHandler : verifyAndRegisterHandler}
              className="space-y-4"
            >
              {step === 1 && (
                <>
                  <div>
                    <Label className="text-gray-700">Full Name</Label>
                    <Input
                      type="text"
                      name="fullname"
                      value={input.fullname}
                      onChange={changeEventHandler}
                      placeholder="Your Name"
                      className="mt-2 shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      placeholder="abc123@gmail.com"
                      className="mt-2 shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Phone Number</Label>
                    <Input
                      type="text"
                      name="phoneNumber"
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                      placeholder="XXXXXXXXXX"
                      className="mt-2 shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={changeEventHandler}
                      placeholder="********"
                      className="mt-2 shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    {roles.map((roleOption) => (
                      <button
                        type="button"
                        key={roleOption}
                        onClick={() =>
                          setInput({ ...input, role: roleOption })
                        }
                        className={`px-3 py-1 rounded-full text-sm border ${
                          input.role === roleOption
                            ? "bg-purple-600 text-white border-purple-600"
                            : "text-gray-600 border-gray-300"
                        } hover:shadow-md transition-all`}
                      >
                        {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div>
                    <Label className="text-gray-700">Profile Picture</Label>
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={changeFileHandler}
                      className="mt-2"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div>
                  <Label className="text-gray-700">Enter OTP</Label>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-digit code"
                    className="mt-2 shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {loading ? (
                <Button className="w-full bg-purple-600 text-white" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full shadow-md transition-all"
                >
                  {step === 1 ? "Send OTP" : "Verify & Register"}
                </Button>
              )}

              <div className="my-3 flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <Button
                type="button"
                onClick={googleSignupHandler}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-full flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <SiGoogle className="w-4 h-4" />
                Sign Up with Google
              </Button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

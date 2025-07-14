import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/constant";
import Navbar from "../components/shared/Navbar";
import { Loader2, ShieldCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailParam = new URLSearchParams(location.search).get("email") || "";
  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      toast.error("Please enter all fields.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${USER_API_END_POINT}/verify-forgot-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("OTP verified! Reset your password.");
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex max-w-4xl w-full">
          {/* Left hero section (consistent with login & forgot password) */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#8B5CF6] to-[#D946EF] text-white flex-col justify-center items-center p-8">
            <h2 className="text-4xl font-bold mb-3">Verify Your OTP 🔐</h2>
            <p className="text-center text-sm max-w-xs mb-2">
              Enter the code we sent to your email.
            </p>
            <p className="text-center text-xs text-purple-100 max-w-xs">
              This helps keep your account secure.
            </p>
          </div>

          {/* Right form section */}
          <div className="flex-1 p-8 sm:p-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white p-4 rounded-full shadow-md">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Verify OTP
            </h1>
            <p className="text-gray-500 text-center text-sm mb-6 max-w-xs mx-auto">
              Enter the OTP we sent to your email address.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
              />

              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
              />

              {loading ? (
                <Button className="w-full bg-purple-600 text-white" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full shadow-lg transition-all"
                >
                  Verify OTP
                </Button>
              )}
            </form>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-purple-600 hover:underline"
              >
                Go back to Forgot Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/constant";
import Navbar from "../components/shared/Navbar";
import { Loader2 } from "lucide-react";
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
      const res = await fetch(
        `${USER_API_END_POINT}/verify-forgot-password-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("OTP verified. Please reset your password.");
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0e9ff] to-[#faf8fe]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white border border-gray-200 shadow-2xl rounded-3xl p-10 animate-fade-in"
        >
          <h1 className="text-3xl font-bold text-center text-[#6A38C2] mb-2">
            Verify OTP
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Enter the OTP sent to your email
          </p>

          <div className="mb-5">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Registered email"
              className="rounded-xl border-gray-300 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
            />
          </div>

          <div className="mb-6">
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="rounded-xl border-gray-300 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
            />
          </div>

          {loading ? (
            <Button
              className="w-full bg-[#6A38C2] hover:bg-[#5a2fb1] text-white font-semibold rounded-xl transition duration-200"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white font-semibold rounded-xl hover:opacity-90 transition duration-200"
            >
              Verify OTP
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;

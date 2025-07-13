import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/constant";
import { Loader2, Mail } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${USER_API_END_POINT}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("OTP sent to your email.");
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#E0C3FC] via-[#8EC5FC] to-[#E0C3FC] px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow rounded-3xl p-10"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white p-4 rounded-full shadow-lg mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Forgot Password</h1>
            <p className="text-gray-500 text-center text-sm">We'll send you an OTP to reset your password</p>
          </div>

          <div className="mb-6">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="focus:ring-2 focus:ring-[#9D50BB] rounded-xl"
            />
          </div>

          {loading ? (
            <Button className="w-full bg-[#6A38C2]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending OTP...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Send OTP
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

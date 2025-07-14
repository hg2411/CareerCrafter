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
    if (!email.trim()) {
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
        toast.success("OTP sent to your email!");
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex max-w-4xl w-full">
          {/* Left hero section (like login page) */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#8B5CF6] to-[#D946EF] text-white flex-col justify-center items-center p-8">
            <h2 className="text-4xl font-bold mb-3">Forgot Password? 🔒</h2>
            <p className="text-center text-sm max-w-xs mb-2">
              Don’t worry, it happens!
            </p>
            <p className="text-center text-xs text-purple-100 max-w-xs">
              Enter your email to get an OTP and reset your password securely.
            </p>
          </div>

          {/* Right form section */}
          <div className="flex-1 p-8 sm:p-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white p-4 rounded-full shadow-md">
                <Mail className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Forgot Password
            </h1>
            <p className="text-gray-500 text-center text-sm mb-6 max-w-xs mx-auto">
              Enter your registered email address below to receive an OTP.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
              />

              {loading ? (
                <Button className="w-full bg-purple-600 text-white" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full shadow-lg transition-all"
                >
                  Send OTP
                </Button>
              )}
            </form>

            <p className="text-center text-xs mt-6 text-gray-400">
              Make sure to check your spam folder if you don’t see the email.
            </p>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm text-purple-600 hover:underline"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

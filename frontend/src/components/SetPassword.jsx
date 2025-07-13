// src/pages/SetPassword.jsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "@/utils/axios"; // ✅ Correct axios import

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);
      const res = await axios.post("/users/set-password", { newPassword: password }, { withCredentials: true }); // ✅ clean relative path

      toast.success(res.data.message || "Password set successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to set password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white light:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-4 text-center">Set Your Password</h2>
      <form onSubmit={handleSetPassword} className="space-y-4">
        <div>
          <label>Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Setting..." : "Set Password"}
        </Button>
      </form>
    </div>
  );
};

export default SetPassword;

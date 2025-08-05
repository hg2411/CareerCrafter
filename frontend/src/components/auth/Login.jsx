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

  const [showPassword, setShowPassword] = useState(false); // 👁️ Password visibility toggle

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
            <h2 className="text-4xl font-bold mb-3">Welcome Back! 👋</h2>
            <p className="text-center text-sm max-w-xs mb-2">
              We’re glad to see you again!
            </p>
            <p className="text-center text-xs text-purple-100 max-w-xs">
              Sign in to stay connected, discover new opportunities, and keep building your journey with us.
            </p>
          </div>

          {/* Right form section */}
          <div className="flex-1 p-8 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Login to Your Account
            </h1>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <Label className="text-gray-700 font-medium">Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="abc123@gmail.com"
                  className="mt-2 shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <Label className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="********"
                    className="mt-2 pr-16 shadow-sm rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-purple-600 hover:underline focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-3">
                  {roles.map((roleOption) => (
                    <button
                      type="button"
                      key={roleOption}
                      onClick={() => setInput({ ...input, role: roleOption })}
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
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {loading ? (
                <Button className="w-full bg-purple-600 text-white" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full shadow-lg transition-all"
                >
                  Login
                </Button>
              )}

              <div className="my-3 flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <Button
                type="button"
                onClick={googleLoginHandler}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-full flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <SiGoogle className="w-4 h-4" />
                Login with Google
              </Button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

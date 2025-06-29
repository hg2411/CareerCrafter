import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.error("User not logged in:", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide cursor-pointer">
          <Link to="/">Career<span className="text-blue-600">Crafter</span></Link>
        </h1>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex font-medium items-center gap-12 text-gray-700 text-lg">
          {user && user.role === "recruiter" ? (
            <>
              <li className="hover:text-blue-600 hover:underline cursor-pointer transition-all">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="hover:text-blue-600 hover:underline cursor-pointer transition-all">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              {["Home", "Jobs", "Browse"].map((item) => (
                <li key={item} className="relative group cursor-pointer">
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block group-hover:text-blue-600 transition-all"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>

        {/* Auth Section - Desktop */}
        {!user ? (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 text-base transition-all hover:scale-105">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base transition-all hover:scale-105 shadow-md">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer hover:scale-105 transition-transform">
                <AvatarImage src={user?.profile?.profilePhoto || "/default-avatar.png"} alt="profile" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-white border border-gray-200 shadow-lg rounded-xl p-4">
              <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto || "/default-avatar.png"} alt="profile" />
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-800">{user?.fullname}</h4>
                  <p className="text-sm text-gray-500">{user?.profile?.bio || user?.email}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                {user?.role === "student" && (
                  <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition-colors">
                    <User2 size={18} />
                    <Button variant="link" className="text-sm p-0 text-gray-700">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition-colors">
                  <LogOut size={18} />
                  <Button onClick={logoutHandler} variant="link" className="text-sm p-0 text-gray-700">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          {user && user.role === "recruiter" ? (
            <>
              <Link to="/admin/companies" onClick={() => setMenuOpen(false)} className="block text-gray-700 text-lg hover:text-blue-600">Companies</Link>
              <Link to="/admin/jobs" onClick={() => setMenuOpen(false)} className="block text-gray-700 text-lg hover:text-blue-600">Jobs</Link>
            </>
          ) : (
            <>
              {["Home", "Jobs", "Browse"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700 text-lg hover:text-blue-600"
                >
                  {item}
                </Link>
              ))}
            </>
          )}

          {!user ? (
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 text-base transition-all hover:scale-105">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base transition-all hover:scale-105 shadow-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {user?.role === "student" && (
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block text-gray-700 text-lg hover:text-blue-600">
                  View Profile
                </Link>
              )}
              <button onClick={() => { logoutHandler(); setMenuOpen(false); }} className="text-left text-gray-700 text-lg hover:text-blue-600">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

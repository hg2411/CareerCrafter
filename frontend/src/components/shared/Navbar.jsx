import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X, Bell } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { getAllNotifications, markAllNotificationsAsRead } from "@/redux/notificationSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { notifications } = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const unreadNotifications = (notifications || []).filter((n) => !n.isRead);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/me", {
          withCredentials: true,
        });
        if (res.data.success) dispatch(setUser(res.data.user));
      } catch (error) {
        console.error("User not logged in:", error);
      }
    };

    if (!user) fetchUser();
    if (user?._id) dispatch(getAllNotifications());
  }, [user, dispatch]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        sessionStorage.setItem("justLoggedOut", "true");
        toast.success(res.data.message);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Logout failed.");
    }
  };

  const markAllReadHandler = async () => {
  try {
    await dispatch(markAllNotificationsAsRead());
  } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to mark as read.");
    }
  };

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide cursor-pointer">
          <Link to="/">Career<span className="text-blue-600">Crafter</span></Link>
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
          {user?.role === "recruiter" ? (
            <>
              {[
                { name: "Companies", path: "/admin/companies" },
                { name: "Jobs", path: "/admin/jobs" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className={`relative transition-colors duration-300 ${
                      currentPath === path
                        ? "text-blue-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:via-blue-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-500"
                        : "text-gray-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-500 after:via-blue-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-500 hover:after:w-full hover:text-blue-600"
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </>
          ) : (
            ["Home", "Jobs", "Browse", "Saved"].map((item) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = currentPath === path;
              return (
                <li key={item}>
                  <Link
                    to={path}
                    className={`relative transition-colors duration-300 ${
                      isActive
                        ? "text-blue-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:via-blue-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-500"
                        : "text-gray-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-500 after:via-blue-500 after:to-pink-500 after:rounded-full after:transition-all after:duration-500 hover:after:w-full hover:text-blue-600"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })
          )}
        </ul>

        {/* Auth & Actions */}
        {!user ? (
          <div className="hidden md:flex gap-3">
            <Link to="/login">
              <Button
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-full font-semibold transition duration-300"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition duration-300"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <Bell className="text-gray-600 hover:text-blue-600" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                      {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
                    </span>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="font-semibold text-gray-800 mb-2">Notifications</div>
                {notifications?.length ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n._id} className="p-2 rounded-md text-sm border bg-gray-50">
                        <p className="font-medium text-gray-800">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    <Button onClick={markAllReadHandler} className="mt-3 w-full" size="sm">
                      Mark all as read
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No notifications.</p>
                )}
              </PopoverContent>
            </Popover>

            {/* Profile */}
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto || "/default-avatar.png"} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex gap-4 items-center">
                  <Avatar><AvatarImage src={user?.profile?.profilePhoto || "/default-avatar.png"} /></Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  {user?.role === "student" && (
                    <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600">
                      <User2 size={18} /> View Profile
                    </Link>
                  )}
                  <div onClick={logoutHandler} className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                    <LogOut size={18} /> Logout
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white border-t border-gray-200">
          {(user?.role === "recruiter"
            ? [
                { name: "Companies", path: "/admin/companies" },
                { name: "Jobs", path: "/admin/jobs" },
              ]
            : ["Home", "Jobs", "Browse", "Saved"].map((item) => ({
                name: item,
                path: item === "Home" ? "/" : `/${item.toLowerCase()}`,
              }))
          ).map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 transition-colors duration-300 hover:text-blue-600 ${
                currentPath === path ? "text-blue-600 font-semibold scale-105" : "text-gray-700"
              }`}
            >
              {name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="w-full mt-2">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full mt-2">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              {user?.role === "student" && (
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 transition-colors duration-300 hover:text-blue-600 ${
                    currentPath === "/profile" ? "text-blue-600 font-semibold scale-105" : "text-gray-700"
                  }`}
                >
                  View Profile
                </Link>
              )}
              <button
                onClick={() => { logoutHandler(); setMenuOpen(false); }}
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

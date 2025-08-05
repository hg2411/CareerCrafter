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
import { setUser, logout } from "@/redux/authSlice";
import {
  getAllNotifications,
  markAllNotificationsAsRead,
} from "@/redux/notificationSlice";

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
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/auth/me",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) dispatch(setUser(res.data.user));
      } catch (error) {
        console.error("User not logged in:", error);
      }
    };

    if (!user && currentPath !== "/login" && currentPath !== "/signup") {
      fetchUser();
    }

    if (user?._id) dispatch(getAllNotifications());
  }, [user, dispatch, currentPath]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
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
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide cursor-pointer">
          <Link to="/">
            Career<span className="text-blue-600">Crafter</span>
          </Link>
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
          {user?.role === "recruiter" ? (
            <>
              {[
                { name: "Companies", path: "/admin/companies" },
{ name: "Jobs", path: "/admin/jobs" },
{ name: "Chat", path: "/recruiter/chat-list" },
{ name: "Chats", path: "/recruiter/chats" }, // ✅ NEW recruiter chat page

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
            ["Home", "Jobs", "Saved"].map((item) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <li key={item}>
                  <Link
                    to={path}
                    className={`relative transition-colors duration-300 ${
                      currentPath === path
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
              <Button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-full font-semibold transition duration-300">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition duration-300">
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
                  <Bell
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    size={22}
                  />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full shadow">
                      {unreadNotifications.length > 9
                        ? "9+"
                        : unreadNotifications.length}
                    </span>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 text-base flex items-center gap-1">
                    <span className="text-yellow-500">🔔</span> Notifications
                  </span>
                  {notifications?.length > 0 && (
                    <Button
                      onClick={markAllReadHandler}
                      size="sm"
                      variant="secondary"
                      className="text-xs px-2 py-1"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                {notifications?.length ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n._id}
                        className="p-2 bg-white rounded-md border shadow hover:shadow-md transition"
                      >
                        <p className="font-medium text-gray-700 text-sm">
                          {n.message}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No notifications 🎉
                  </p>
                )}
              </PopoverContent>
            </Popover>

            {/* Profile */}
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-blue-500 shadow hover:shadow-md transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/default-avatar.png"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border shadow">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "/default-avatar.png"}
                    />
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-base truncate">
                      {user?.fullname}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                    >
                      <User2 size={16} /> View Profile
                    </Link>
                  )}
                  {user?.role === "recruiter" && (
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                    >
                      <User2 size={16} /> View Profile
                    </Link>
                  )}
                  <div
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-gray-700 hover:text-red-600 cursor-pointer transition"
                  >
                    <LogOut size={16} /> Logout
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
                { name: "Chats", path: "/admin/chats" },
              ]
            : ["Home", "Jobs", "Saved"].map((item) => ({
                name: item,
                path: item === "Home" ? "/" : `/${item.toLowerCase()}`,
              }))
          ).map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 transition-colors duration-300 hover:text-blue-600 ${
                currentPath === path
                  ? "text-blue-600 font-semibold scale-105"
                  : "text-gray-700"
              }`}
            >
              {name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="w-full mt-2">
                  Login
                </Button>
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
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                >
                  <User2 size={16} /> View Profile
                </Link>
              )}
              {user?.role === "recruiter" && (
                <Link
                  to="/admin/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                >
                  <User2 size={16} /> View Profile
                </Link>
              )}
              <button
                onClick={() => {
                  logoutHandler();
                  setMenuOpen(false);
                }}
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

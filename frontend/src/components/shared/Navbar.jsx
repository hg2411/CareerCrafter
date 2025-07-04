import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { getAllNotifications, markNotificationsAsRead } from "@/redux/notificationSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { notifications } = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const unreadNotifications = (notifications || []).filter((n) => !n.read);

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
      await dispatch(markNotificationsAsRead());
    } catch (error) {
      console.error(error);
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

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 text-lg font-medium">
          {user?.role === "recruiter" ? (
            <>
              <li><Link to="/admin/companies" className="hover:text-blue-600">Companies</Link></li>
              <li><Link to="/admin/jobs" className="hover:text-blue-600">Jobs</Link></li>
            </>
          ) : (
            ["Home", "Jobs", "Browse", "Saved"].map((item) => (
              <li key={item}>
                <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-blue-600">
                  {item}
                </Link>
              </li>
            ))
          )}
        </ul>

        {/* Auth & Actions */}
        {!user ? (
          <div className="hidden md:flex gap-4">
            <Link to="/login"><Button variant="outline">Login</Button></Link>
            <Link to="/signup"><Button>Sign Up</Button></Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* 🔔 Notifications */}
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
                        {n.message}
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

            {/* 🧑‍🎓 Profile */}
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

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white border-t border-gray-200">
          {(user?.role === "recruiter" ? ["Companies", "Jobs"] : ["Home", "Jobs", "Browse", "Saved"]).map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              {item}
            </Link>
          ))}

          {!user ? (
            <>
              <Link to="/login"><Button variant="outline" className="w-full mt-2">Login</Button></Link>
              <Link to="/signup"><Button className="w-full mt-2">Sign Up</Button></Link>
            </>
          ) : (
            <>
              {user?.role === "student" && (
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                  View Profile
                </Link>
              )}
              <button onClick={() => { logoutHandler(); setMenuOpen(false); }} className="block py-2 text-gray-700 hover:text-blue-600">
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

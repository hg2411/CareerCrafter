"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { LogOut, User2, Menu, X, Bell, Sparkles, Crown, Briefcase, Home, Heart } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser, logout } from "@/redux/authSlice"
import { getAllNotifications, markAllNotificationsAsRead } from "@/redux/notificationSlice"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const { notifications } = useSelector((store) => store.notification)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const [menuOpen, setMenuOpen] = useState(false)

  const unreadNotifications = (notifications || []).filter((n) => !n.isRead)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/user/auth/me", {
          withCredentials: true,
        })
        if (res.data.success) dispatch(setUser(res.data.user))
      } catch (error) {
        console.error("User not logged in:", error)
      }
    }
    if (!user && currentPath !== "/login" && currentPath !== "/signup") {
      fetchUser()
    }
    if (user?._id) dispatch(getAllNotifications())
  }, [user, dispatch, currentPath])

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(logout())
        sessionStorage.setItem("justLoggedOut", "true")
        toast.success(res.data.message)
        navigate("/login", { replace: true })
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Logout failed.")
    }
  }

  const markAllReadHandler = async () => {
    try {
      await dispatch(markAllNotificationsAsRead())
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Failed to mark as read.")
    }
  }

  const getNavItems = () => {
    if (user?.role === "recruiter") {
      return [
        { name: "Companies", path: "/admin/companies", icon: Briefcase },
        { name: "Jobs", path: "/admin/jobs", icon: Briefcase },
        { name: "Chats", path: "/recruiter/chats", icon: User2 },
      ]
    }
    return [
      { name: "Home", path: "/", icon: Home },
      { name: "Jobs", path: "/jobs", icon: Briefcase },
      { name: "Saved", path: "/saved", icon: Heart },
    ]
  }

  return (
    <nav className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        {/* Logo */}
        <Link to="/" className="group">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight cursor-pointer group-hover:scale-105 transition-transform duration-300">
            Career
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Crafter
            </span>
            <Sparkles className="inline-block w-6 h-6 ml-1 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {getNavItems().map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <Link
                to={path}
                className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  currentPath === path
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:text-orange-600 hover:scale-105"
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth & Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex gap-3">
              <Link to="/login">
                <Button className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className="p-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300 group-hover:scale-110">
                      <Bell className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                      {unreadNotifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs flex items-center justify-center rounded-full shadow-lg animate-pulse">
                          {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
                        </span>
                      )}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-white/95 backdrop-blur-lg border-2 border-gray-100 shadow-2xl rounded-2xl p-4 mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-black text-gray-900 text-lg">Notifications</span>
                    </div>
                    {notifications?.length > 0 && (
                      <Button
                        onClick={markAllReadHandler}
                        size="sm"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-lg font-semibold"
                      >
                        Mark all read
                      </Button>
                    )}
                  </div>
                  {notifications?.length ? (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n._id}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                            n.isRead
                              ? "bg-gray-50 border-gray-200"
                              : "bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200"
                          }`}
                        >
                          <p className="font-semibold text-gray-800 text-sm">{n.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell className="w-8 h-8 text-orange-500" />
                      </div>
                      <p className="text-gray-500 font-medium">No notifications yet!</p>
                      <p className="text-gray-400 text-sm">We'll notify you when something happens</p>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {/* Profile */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <div className="p-1 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                      <Avatar className="w-10 h-10 border-2 border-white shadow-lg">
                        <AvatarImage src={user?.profile?.profilePhoto || "/placeholder.svg?height=40&width=40"} />
                      </Avatar>
                    </div>
                    {user?.role === "recruiter" && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-72 bg-white/95 backdrop-blur-lg border-2 border-gray-100 shadow-2xl rounded-2xl p-4 mt-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-14 h-14 border-2 border-orange-200 shadow-lg">
                        <AvatarImage src={user?.profile?.profilePhoto || "/placeholder.svg?height=56&width=56"} />
                      </Avatar>
                      {user?.role === "recruiter" && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900 text-lg truncate">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      <div className="inline-flex items-center gap-1 mt-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            user?.role === "recruiter" ? "bg-yellow-400" : "bg-blue-400"
                          }`}
                        ></div>
                        <span className="text-xs font-semibold text-gray-600 capitalize">{user?.role}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to={user?.role === "student" ? "/profile" : "/admin/profile"}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 text-gray-700 hover:text-orange-600 transition-all duration-300 group"
                    >
                      <User2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">View Profile</span>
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 group"
                    >
                      <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300 hover:scale-110"
            >
              {menuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {getNavItems().map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPath === path
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:text-orange-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}

            {!user ? (
              <div className="pt-4 space-y-3">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-3 rounded-xl font-bold">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Link
                  to={user?.role === "student" ? "/profile" : "/admin/profile"}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 text-gray-700 hover:text-orange-600 transition-all duration-300"
                >
                  <User2 className="w-5 h-5" />
                  <span className="font-semibold">View Profile</span>
                </Link>
                <button
                  onClick={() => {
                    logoutHandler()
                    setMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

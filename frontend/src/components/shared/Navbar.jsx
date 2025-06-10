import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
          Career<span className="text-[#6A38C2]">Crafter</span>
        </h1>

        {/* Nav Links */}
        <ul className="hidden md:flex font-medium items-center gap-10 text-gray-700 text-[16px]">
          {["Home", "Jobs", "Browse"].map((item) => (
            <li
              key={item}
              className="hover:text-[#6A38C2] transition-colors duration-200 cursor-pointer"
            >
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        {/* Auth Section */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              {" "}
              <Button
                variant="outline"
                className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 text-sm transition-all"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              {" "}
              <Button className="rounded-full px-5 py-2 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white text-sm transition-all">
                Sign Up
              </Button>{" "}
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/Passport Size Photo.jpg" alt="profile" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-white border border-gray-200 shadow-lg rounded-xl p-4">
              <div className="flex gap-4 items-center">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/Passport Size Photo.jpg" alt="profile" />
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-800">Himani Goyal</h4>
                  <p className="text-sm text-gray-500">
                    This is the job portal
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2 hover:text-[#6A38C2] cursor-pointer transition-colors">
                  <User2 size={18} />
                  <Button variant="link" className="text-sm p-0 text-gray-700">
                    View Profile
                  </Button>
                </div>
                <div className="flex items-center gap-2 hover:text-[#6A38C2] cursor-pointer transition-colors">
                  <LogOut size={18} />
                  <Button variant="link" className="text-sm p-0 text-gray-700">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user=false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Career<span className="text-[#F83002]">Crafter</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-8">
            <li>Home</li>
            <li>Job</li>
            <li>Browse</li>
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Button variant="outline">Login</Button>
                <Button className='bg[#6A38C2] hover:bg-[#5b30a6]'>SignUp</Button>
                </div>
            ):(
                <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-88">
              <div className="flex gap-4 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">Mern Stack</h4>
                  <p className="text-sm text-muted-foreground">
                    This is the job portal
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-gray-600">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2 />
                  <Button variant="link">View Profile</Button>
                </div>
                <div className="flex w-fit items-center gap-2  cursor-pointer">
                  <LogOut />
                  <Button variant="link">Logout</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;

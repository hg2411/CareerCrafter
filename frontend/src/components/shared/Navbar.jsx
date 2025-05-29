import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function Navbar() {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Career<span className="text-[#F83002]">Crafter</span>
          </h1>
        </div>

        <div>
          <ul className="flex font-medium items-center gap-8">
            <li>Home</li>
            <li>Job</li>
            <li>Browse</li>
          </ul>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <h1>hello</h1>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

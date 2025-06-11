import React from "react";
import { Button } from "./ui/button";
import {  Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "thisisjob";

  return (
    <div className="p-5 rounded-md  shadow-xl bg-white border-gray-100">
      <div className="flex items-center gap-2 my-2 ">
        <p className="text-sm text-gray-500 ">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex item-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s"
              className="w-10 h-10 object-cover"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg ">Company Name</h1>
          <p className="text-sm  text-gray-500 ">India</p>
        </div>
      </div>
      <div>
        <h1 className="font bold  text-lg my-2">Tittle</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
          corrupti quibusdam omnis consequatur quo aspernatur, perspiciatis
          consectetur quidem voluptatem nesciunt, est ducimus tempore, quos
          officiis illum! Quidem obcaecati architecto odio.
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part Time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Button  onClick={()=> navigate(`/description/${jobId}`)} variant="outline">Details</Button>
              <Button className=" bg-[#6f0998a5]">Save for later</Button>
            </div>
    </div>
  );
};
export default Job;

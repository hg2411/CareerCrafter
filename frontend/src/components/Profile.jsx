import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";

const skills = ["Html", "CSS", "Javascript", "Reactjs"];
const Profile = () => {
     const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s" />
            </Avatar>
            <div>
              <h1 className="font-medium  text-xl">Himani Goyal</h1>
              <p>
                {" "}
                Hii guys Himani this side !!! currently i am pursing my masters
                from MNNIT{" "}
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>himani@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>1234567890</span>
          </div>
        </div>
        <div>
          <h1 className="text-md font-bold">Skills</h1>
          <div className="flex items-center flex-wrap gap-2">
            {skills.length !== 0 ? (
              skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid-w-full max-w-sm items-center gap-2 mt-4">
  <Label className="text-md font-bold"> Resume </Label>
  {
    isResume ? (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://drive.google.com/file/d/1x6ywOt68qTc1Kfk4LhGy1YtNl6VXGZdV/view?usp=drive_link " className="text-blue-500 w-full hover:underline cursor-pointer"
      >
        Click here 
      </a>
    ) : (
      <span>NA</span>
    )
  }
</div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl ">
  <h1 className="font-bold text-lg m-5 ">Applied Jobs</h1>
  {/*Applied job  table*/}
  <AppliedJobTable/>

</div>
    </div>
  );
};
export default Profile

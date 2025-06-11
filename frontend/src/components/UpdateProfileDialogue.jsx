import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const UpdateProfileDialogue = ({ open, setOpen }) => {
      const [loading,setLoading] = useState(false);
      const {user} = useSelector(store=>store.auth);
       
      const[input,setInput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skill?.map(skill =>skill),
        file:user?.profile?.resume
      });
      const changeEventHandler =(e) =>{
        setInput({...input,[e.target.name]:e.target.value})
      }
       const fileChangeHandler = (e) =>{
         const  file = e.target.files?.[0];
         setInput({...input,file})
       }
      const submitHandler = (e) =>{
               e.preventDefault();
               console.log(input);
      }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-white sm:max-w-[425px]"
          onPointerDownOutside={() => setOpen(false)} // Corrected prop name
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <Form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" type="text" name="name" value={input.fullname}  onChange={changeEventHandler} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler}  className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="number"
                    className="text-right whitespace-nowrap"
                  >
                    Phone Number
                  </Label>
                  <Input id="number" name="number" value={input.phoneNumber}  onChange={changeEventHandler}  className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input id="bio" name="bio" value={input.bio}  onChange={changeEventHandler}  className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    SKills
                  </Label>
                  <Input id="skills" name="skills" value={input.skills }  onChange={changeEventHandler} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Resume
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
               <DialogFooter>
               
          {loading ? (
            <Button className="w-full bg-[#6A38C2] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full transition-all"
            >
           Update
            </Button>
          )}
           </DialogFooter>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialogue;
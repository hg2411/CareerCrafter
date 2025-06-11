import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const UpdateProfileDialogue = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white sm:max-w-[425px]" onInteractOutside={() => setOpen(false)} >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <Form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" name="email" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="number" className="text-right">
                    Phone Number 
                  </Label>
                  <Input id="number" name="number" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input id="bio" name="bio" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    SKills
                  </Label>
                  <Input id="skills" name="skills" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Resume
                  </Label>
                  <Input id="file" name="file" type="file" accept="appliaction/pdf" className="col-span-3" />
                </div>
              </div>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialogue;

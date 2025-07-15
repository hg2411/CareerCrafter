import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Form } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
    profilePhoto: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const profilePhotoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, profilePhoto: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login/signup to update profile");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    const sanitizedPhone = input.phoneNumber.toString().replace(/\D/g, "");
    formData.append("phoneNumber", sanitizedPhone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
  <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl sm:max-w-[450px] p-6">
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        ✏️ <span className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-transparent bg-clip-text">Update Profile</span>
      </DialogTitle>
      <DialogDescription className="text-xs text-gray-500">
        Fill in the details below to refresh your profile.
      </DialogDescription>
    </DialogHeader>
    <Form onSubmit={submitHandler} className="space-y-4 mt-4">
      {["fullname", "email", "phoneNumber", "bio", "skills"].map((field) => (
        <div key={field}>
          <Label htmlFor={field} className="block mb-1 text-xs text-gray-600 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </Label>
          <Input
            id={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            value={input[field]}
            onChange={changeEventHandler}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#9D50BB] focus:ring-2 focus:ring-[#9D50BB]/20 transition"
          />
        </div>
      ))}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="file" className="block mb-1 text-xs text-gray-600">Resume (PDF)</Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="application/pdf"
            onChange={fileChangeHandler}
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:border-[#9D50BB] focus:ring-2 focus:ring-[#9D50BB]/20 transition"
          />
        </div>
        <div>
          <Label htmlFor="profilePhoto" className="block mb-1 text-xs text-gray-600">Profile Photo</Label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            accept="image/*"
            onChange={profilePhotoChangeHandler}
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:border-[#9D50BB] focus:ring-2 focus:ring-[#9D50BB]/20 transition"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] hover:opacity-90 text-white font-medium py-2 rounded-full transition"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : "Update"}
        </Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</Dialog>

  );
};

export default UpdateProfileDialogue;

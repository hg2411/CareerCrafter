"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"
import { Form } from "react-router-dom"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Loader2,
  User,
  Mail,
  Phone,
  FileText,
  ImageIcon,
  Sparkles,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { USER_API_END_POINT } from "@/utils/constant"
import { toast } from "react-toastify"
import axios from "axios"
import { setUser } from "@/redux/authSlice"

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
    profilePhoto: null,
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const profilePhotoChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, profilePhoto: file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error("Please login/signup to update profile")
      return
    }

    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    const sanitizedPhone = input.phoneNumber.toString().replace(/\D/g, "")
    formData.append("phoneNumber", sanitizedPhone)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)
    if (input.file) formData.append("file", input.file)
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto)

    try {
      setLoading(true)
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
        setOpen(false)
      }
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || "Something went wrong!"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white w-full h-full max-w-none rounded-none p-0 sm:p-0 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        {/* Decorative header */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 h-3"></div>

        {/* Decorative elements */}
        <div className="absolute top-12 right-6 w-20 h-20 bg-orange-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-12 left-6 w-16 h-16 bg-purple-200 rounded-full opacity-20"></div>

        <div className="p-6 max-w-4xl mx-auto">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">
                  Update Profile
                </span>
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600">
              Enhance your profile with more details to stand out to recruiters
            </DialogDescription>
          </DialogHeader>

          <Form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="fullname"
                      name="fullname"
                      type="text"
                      value={input.fullname}
                      onChange={changeEventHandler}
                      className="pl-10 py-3 rounded-xl border-2 border-gray-200"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      className="pl-10 py-3 rounded-xl border-2 border-gray-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                      className="pl-10 py-3 rounded-xl border-2 border-gray-200"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="py-3 rounded-xl border-2 border-gray-200"
                  placeholder="Brief description about yourself"
                />
              </div>

              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  type="text"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="py-3 rounded-xl border-2 border-gray-200"
                  placeholder="React, Node.js, JavaScript"
                />
              </div>

              {/* Files */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <Label htmlFor="file" className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-gray-500" />
                    Resume (PDF)
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                    className="file:cursor-pointer file:bg-gradient-to-r file:from-orange-500 file:to-pink-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0"
                  />
                </div>
                <div>
                  <Label htmlFor="profilePhoto" className="flex items-center gap-1">
                    <ImageIcon className="h-4 w-4 text-gray-500" />
                    Profile Photo
                  </Label>
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={profilePhotoChangeHandler}
                    className="file:cursor-pointer file:bg-gradient-to-r file:from-orange-500 file:to-pink-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6">
              <div className="flex gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialogue

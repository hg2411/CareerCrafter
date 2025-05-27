import User from "../models/user.model.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", sucess: false });
    };
    const user=await User.findOne({email});
    if(user){
      return res.status(400).json({ message: "User already exists with this email", sucess: false });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role

    });
    return res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
   console.log(error);
  }
}
export const login = async (req, res) => {
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({message:"Something is missing",success:false});
        };
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Incorrect email or Password",success:false})
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"Incorrect email or Password",success:false})
        }
        // check if role is correct or not 
        if(role !=user.role){
            return res.status(400).json({message:"Account doest not exits with current role",success:false})
        };
        const tokenData={
            userId:user._id
        }
        const token =await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role
            // profile:user.profile(he removed the profile field told he will add it later but he had used it here)
        }
        return res.status(200).cookie("token",token,{maxAge: 24 * 60 * 60 * 1000, httpOnly: true,sameSite:'strict'}).json({message:`Welcome back ${user.fullname}`,user,success:true});
    }catch(error){
       console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname,email,phoneNumber,bio,skills } = req.body;
        const file=req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ message: "Something is missing", success: false });
        };

        // coludinary resume wali file ka setup iddar hogha 
        const skillsArray = skills.split(",");
        const userId= req.id; // mildware autentication se aayegha baad m baatyegha 
        let user=await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        //updating the data
        user.fullname = fullname;
        user.email = email; 
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;
//resume  will comes here  later ....
        await user.save();
         user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role
            // profile:user.profile(he removed the profile field told he will add it later but he had used it here)
        }
        return res.status(200).json({ message: "Profile updated successfully", user, success: true });

    } catch (error) {
        console.log(error);
    }
}
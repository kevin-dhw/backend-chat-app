import { generateToken } from "../lib/utils.js"
import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    const {fullName, email, password, bio} = req.body
    try {
       if ( !fullName | !email| !password| !bio) {
           res.json({success: false, message: "Missing Details"})
       }
       const user = await User.findOne({email})
       if (user) {
           res.json({success: true, message: "account already exists", user: user})
       }
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt)
       const newUser = await User.create({
        fullName, email, password: hashedPassword, bio
       })
       const token = generateToken(newUser._id)
       res.json({success: true, userData: newUser, token, message: "account already exists"})
    } catch (err) {
        console.log(err.message, 'message');
       res.json({success: false, message: err.message})
    }
}
export const test = async (req, res) => {
   return res.json({success: true, message:  '1234'})
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const userData = await User.findOne({email})
        const isPasswordConnect = await bcrypt.compare(password, userData.password)
        if (!isPasswordConnect) {
         res.json({success: false, message: "Invalid credentials"})
        }
        const token = generateToken(userData._id)
        res.json({success: true, userData, token, message: "login successful"})
    } catch (err) {
        console.log(err.message, 'message');
        res.json({success: false, message: err.message})
    }
}

// check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
 }

// controller to update user profile details
export const updateProfile = async (req, res) => {
   try {
      const {profilePic, bio, fullName} = req.body
      const userId = req.user._id;
      let updateUser;
      if (!profilePic) {
        // {new: true} it will return the new data
        updateUser =  await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true})
      } else {
        const upload = await cloudinary.uploader.upload(profilePic)
        updateUser = await User.findByIdAndUpdate(userId, 
          {profilePic: upload.secure_url, bio, fullName}, {new: true})
      }
      res.json({success: true, user: updateUser})
   } catch (err) {
      console.log(err.message, 'message');
      res.json({success: false, message: err.message})
   }
}
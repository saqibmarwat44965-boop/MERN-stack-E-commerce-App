import { CatchErr, error, success, warning } from "../helpers/error.js";
import User from "../models/userModel.js";
import sendEmail from "../utili/sendEmail.js"
// pakages
import evalidator from 'email-validator' 
import pvalidator from 'password-validator'
import {nanoid} from 'nanoid'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { SECRET_KEY } from "../config/config.js";
import genrateUserTokenAndUser from "../helpers/genTokenUserRes.js";


var desiredLength = new pvalidator().is().min(8).is().max(25)
var upperCase = new pvalidator().has().uppercase(1)  
var digit = new pvalidator().has().digits(1)
var Symbol = new pvalidator().has().symbols(2)
                     


const PreSingup = async (req,res) => {
    try{
       const {first_name,last_name,email,password,confirm_password} = req.body
        

       const emailfound = await User.findOne({email})
       
       if(!first_name || !last_name || !email || !password || !confirm_password){
      
          return  error(res,'All fields are required')
          
       }else if(!evalidator.validate(email)){
         return  warning(res,'Email format is invalid')
       }
        else if(emailfound){
         return  error(res,`This ${email} Email is already registered`)
       }
       
         else if(!desiredLength.validate(password)){
         return  warning(res,'Password length must b/w 8 to 25 ')
       }
        else if(!upperCase.validate(password)){
         return  warning(res,'Password must include 1 capital letter')
       }
        else if(!digit.validate(password)){
         return  warning(res,'Password must include 1 digit')
       }
        else if(!Symbol.validate(password)){
         return  warning(res,'Password must include 2 special character')
       }
       else if(password != confirm_password){
          return warning(res,'Password and confirm password must be match')
       }
        
       const otp = nanoid(6);

       const token = jwt.sign({first_name,last_name,email,password,otp},SECRET_KEY,{expiresIn:"4h"})
        
       const activateLink = `${process.env.CLIENT_URL}/activate/${encodeURIComponent(token)}`;

          const html = `
      <h2>Email Verification</h2>
      <p>Hi ${first_name},</p>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      
       <a href="${activateLink}" 
       style="padding:10px 15px; background:#2563eb; color:white; text-decoration:none;">
      Activate Account
      </a>
      <p>This code will expire in 10 minutes.</p>
    `;

    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html,
    });


    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
      token, // send to frontend
      otp,   // remove in production
    });

        
       
    }catch(err){
         CatchErr(err,res)
    }
}

const ActivateAccount = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return error(res, "Activation token missing");

    // Decode token safely
    const decoded = jwt.verify(decodeURIComponent(token), SECRET_KEY);

    // Check if user already exists
    const existingUser = await User.findOne({ email: decoded.email });
    if (existingUser) return warning(res, "Account already activated");

    // Hash password (from token payload)
    const hashedPassword = await bcryptjs.hash(decoded.password, 12);

    // Create user in DB
    await User.create({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      password: hashedPassword,
      isVerified: true,
    });

    return success(res, "Account activated successfully");

  } catch (err) {
    console.error(err);
    return error(res, "Invalid or expired activation link");
  }
};


const Singup = async (req,res) => {
    
  try {
    const token = req.body.token;

    const {first_name,last_name,email,password} = jwt.verify(token,SECRET_KEY)
    
    const salt = await bcryptjs.genSalt(12)
    const hashPassword = await bcryptjs.hash(password,salt)
     
      const emailfound = await User.findOne({email})
      if(emailfound){
         return  error(res,`You have already registered`)
       }

    await User (
      {
        first_name,
        last_name,
        email,
        password: hashPassword
      }
    ).save()

    res.json({
      message : `${first_name} ${last_name} ,Your account have been created `
    })


  } catch (err) {
    CatchErr(err, res);
  }
};
       
const generateUserTokenAndSend = (user, res, message) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role }, 
    SECRET_KEY, 
    { expiresIn: "7d" }
  );

  return res.status(200).json({
    success: true,
    message,
    token,
    user: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
  });
};

const Login = async (req,res) => {
    try{
       const{email,password} = req.body

       const user = await User.findOne({email})

       if(!email || !password){
        return  warning(res,'Both fields are required')
       }
       if(!evalidator.validate(email)){
            warning(res,'Email is not valid')
       }
       if(!user){
             error(res,`This email ${email} is not registered`)
       }
       
      const isMatchpassword = await bcryptjs.compare(password,user.password)
      if(!isMatchpassword){
       return error(res,'Wrong Password')
      }

     return generateUserTokenAndSend(user, res, "You are successfully logged in");

       
    }catch(err){
         CatchErr(err,res)
    }
}

const forgetPassword_otp = async (req,res) => {
    try{
       const email = req.body.email
       const user = await User.findOne({email})
       
        if(!email){
        return  warning(res,'Please Enter your Email')
       }
       if(!evalidator.validate(email)){
            warning(res,'Email is not valid')
       }
       if(!user){
             error(res,`This email ${email} is not registered`)
       }
       
      const otp = nanoid(6).toUpperCase();

    // Save OTP & expiry (10 minutes)
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Email HTML
    const html = `
      <h2>Password Reset Request</h2>
      <p>Hi ${user.first_name},</p>
      <p>Your password reset code is:</p>
      <h1>${otp}</h1>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn’t request this, ignore this email.</p>
    `;

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      html,
    });

    return success(res, "OTP sent to your email");

    }catch(err){
         CatchErr(err,res)
    }
}


const resetPassword = async (req, res) => {
  try {
    const { otp, new_password, confirm_new_password } = req.body;

    if (!otp || !new_password || !confirm_new_password) {
      return warning(res, "All fields are required");
    }

    if (new_password !== confirm_new_password) {
      return warning(res, "Passwords must match");
    }

    // Find user by OTP and check if OTP is still valid
    const user = await User.findOne({ otp });

    if (!user) {
      return warning(res, "Wrong OTP or it may have expired");
    }

    // Hash new password before saving
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(new_password, salt);

    user.otp = ""; // clear OTP after reset
    user.otpExpiry = null; // clear expiry
    await user.save();

    return success(res, "Password reset successfully. You can now login.");
  } catch (err) {
    CatchErr(err, res);
  }
};

export default resetPassword;




const changePassword = async (req,res) => {
    try{
      

       
    }catch(err){
         CatchErr(err,res)
    }
}

const fetchLoggedUser = async (req,res) => {
    try{
      

       
    }catch(err){
         CatchErr(err,res)
    }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      body,
      { new: true } // return updated data
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};


export {
    PreSingup,
    ActivateAccount,
    Singup,
    Login,
    forgetPassword_otp,
    resetPassword,
    changePassword,
    fetchLoggedUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}
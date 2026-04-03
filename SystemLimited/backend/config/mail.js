import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || smtp.gmail.com,
  port: Number(process.env.EMAIL_PORT)|| 587,
  secure: false,                  // false for TLS 587
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // your App Password
  },
  
});

export default transporter;

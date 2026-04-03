import React, { useState } from "react";
import axios from 'axios'
import apis from "../../config/apis";
import {successToast,errorToast, warningToast} from "../../message/toastify.js"
import profile from '../../images/profile.jpg'
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password:"",
  });

  const ChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const SignupHandler = async (e) => {

   try{
          e.preventDefault()
          const {data} = await axios.post(`${apis[1]}/pre-signup`,user)
          const {warning,message,error} = data
 
          if(warning){
             warningToast(warning)
          }
          else if(message){
            successToast(message)
          }
          else if(error){
            errorToast(error)
          }

   }catch(err){
     console.log('ghalat code likha he')
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 via-gray-900 to-black px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-lg p-8">
        <img src={profile} className="mx-auto rounded-full w-[200px] h-[200px]" />
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Create Your Account
        </h2>

        <form onSubmit={SignupHandler} className="space-y-5">
          <div className="flex space-x-4">
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={ChangeHandler}
              placeholder="First Name"
              className="w-1/2 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={ChangeHandler}
              placeholder="Last Name"
              className="w-1/2 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={ChangeHandler}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={ChangeHandler}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            name="confirm_password"
            value={user.confirm_password}
            onChange={ChangeHandler}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 transition-colors text-white font-bold py-3 rounded-xl shadow-md"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

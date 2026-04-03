import React, { useState } from "react";
import axios from "axios";
import apis from "../../config/apis";
import { successToast, errorToast, warningToast } from "../../message/toastify.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.jsx";

const Login = () => {
  
  const navigate = useNavigate()
  const[auth,setAuth] = useAuth()

  if(auth?.token){
    navigate("/dashboard")
  }

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("i am here")
      const { data } = await axios.post(`${apis[1]}/login`, credentials);
      
      const {warning,error,message} = data


       if (warning) {
        warningToast(warning);
      } 
      if (error) {
        errorToast(error);
      }

       // after login success
if (message) {
  successToast(message);

  const loginData = {
    user: data.user,
    token: data.token, // <- ensure your backend returns token here
  };

  localStorage.setItem("auth", JSON.stringify(loginData));
  setAuth(loginData);

  setTimeout(() => {
    navigate("/dashboard");
  }, 1000);
}

      // if (message) {
      //   successToast(message);
      //   // You can redirect user here, e.g., navigate("/dashboard")
        
      //   localStorage.setItem("auth", JSON.stringify(data));
      //   setAuth(data)
      //   setTimeout(() =>{
      //      navigate("/dashboard") 
      //   },2000)
        

      // }
      

    } catch (err) {
      errorToast(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition"
            required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center text-white/80">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link
              to="/forget-password"
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

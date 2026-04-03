import React, { useState } from "react";
import axios from "axios";
import apis from "../../config/apis"; // your API base URLs
import { errorToast, successToast } from "../../message/toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const { data } = await axios.post(`${apis[1]}/otp`, { email });
      
      setMessage(data.message || "OTP sent successfully");
     
      if(data.message){
        successToast("OTP sent successfully")
        navigate("/reset-password")
      }
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 via-gray-900 to-black px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 transition-colors text-white font-bold py-3 rounded-xl shadow-md disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 font-medium ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-gray-400 mt-6">
          Remembered your password?{" "}
          <a href="/login" className="text-teal-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;

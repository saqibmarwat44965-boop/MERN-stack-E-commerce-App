import React, { useState } from "react";
import axios from "axios";
import apis from "../../config/apis"; // your API base URLs
import { successToast, errorToast, warningToast } from "../../message/toastify.js";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    otp: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${apis[1]}/reset-password`, formData);
      const { warning, error, message } = data;

      if (warning) {
        warningToast(warning);
      }
      if (error) {
        errorToast(error);
      }
      if (message) {
        successToast(message);
        setTimeout(() => navigate("/login"), 1500); // navigate to login after success
      }
    } catch (err) {
      errorToast(err.response?.data?.message || "Server error");
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
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            name="confirm_new_password"
            value={formData.confirm_new_password}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 transition-colors text-white font-bold py-3 rounded-xl shadow-md disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

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

export default ResetPassword;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const encodedToken = encodeURIComponent(token);

        const { data } = await axios.get(
          `http://localhost:7200/api/v1/users/activate/${encodedToken}`
        );

        setMessage(data.message || "Account activated successfully");
        setIsError(false);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setIsError(true);
        setMessage(
          err.response?.data?.message || "Invalid or expired activation link"
        );
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-gray-700">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        {loading ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Activating your account...
            </h2>
            <p className="text-gray-400 mt-2">
              Please wait, do not refresh the page
            </p>
          </>
        ) : (
          <>
            <h2
              className={`text-2xl font-bold ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </h2>
            {!isError && (
              <p className="text-gray-400 mt-3">
                Redirecting to login page...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;

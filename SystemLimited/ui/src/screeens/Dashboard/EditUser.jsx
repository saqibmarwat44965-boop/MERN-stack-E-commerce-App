import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { successToast, errorToast } from "../../message/toastify";
import { useAuth } from "../../context/Auth";
import apis from "../../config/apis";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${apis[1]}/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setUser(data.user);
    } catch (error) {
      errorToast("Failed to load user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apis[1]}/${id}`, user, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      successToast("User updated successfully");
      navigate("/dashboard/users");
    } catch (error) {
      errorToast("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={user.first_name}
          onChange={(e) =>
            setUser({ ...user, first_name: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          value={user.last_name}
          onChange={(e) =>
            setUser({ ...user, last_name: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
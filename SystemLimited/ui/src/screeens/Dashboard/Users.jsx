import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useAuth } from "../../context/Auth";
import apis from "../../config/apis";
import { FaEdit, FaTrash } from "react-icons/fa";
import { successToast, errorToast } from "../../message/toastify";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // 🔹 Fetch users from MongoDB API
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${apis[1]}/allusers`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      

      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // 🔹 DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "first_name", headerName: "First Name", width: 160 },
    { field: "last_name", headerName: "Last Name", width: 160 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "role", headerName: "Role", width: 130 },

     {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <div className="flex gap-3">
        {/* Edit */}
        <FaEdit
          className="text-blue-500 cursor-pointer"
          onClick={() => handleEdit(params.row)}
        />

        {/* Delete */}
        <FaTrash
          className="text-red-500 cursor-pointer"
          onClick={() => handleDelete(params.row._id)}
        />
      </div>
    ),
  },
  ];

  // 🔹 MongoDB data ko datagrid format me convert karta he
  const rows = users.map((user,index) => ({
    id: index + 1,  
    _id: user._id,             // DataGrid requires id
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role || "User",
  }));

  // 🔹 Search filter
  const filteredRows = rows.filter((row) =>
    row.first_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async (id) => {
  try {
    await axios.delete(`${apis[1]}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });

    successToast("User deleted successfully");

    // refresh list
    getUsers();
  } catch (error) {
    errorToast("Delete failed");
  }
};

const handleEdit = (user) => {
  navigate(`/dashboard/users/edit/${user._id}`);
};

  return (
    <div className="p-6">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by first name..."
        className="border px-3 py-2 mb-4 w-64"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* 📊 DataGrid */}
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          sortingOrder={["asc", "desc"]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Users;

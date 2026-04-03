import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useAuth } from "../../context/Auth";
import apis from "../../config/apis";

// Icons
import { MdDelete, MdEdit } from "react-icons/md";

// Toastify
import { successToast, errorToast } from "../../message/toastify";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate()

  const [auth] = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // 🔹 Fetch products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(apis[0], {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      errorToast("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔴 DELETE product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const { data } = await axios.delete(`${apis[0]}/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      successToast(data.message || "Product deleted successfully");

      // Update UI
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      errorToast("Product delete failed");
    }
  };

  // 🟡 UPDATE product (for now just demo)
  const handleEdit = (product) => {


    // later:
    // open modal or navigate to edit page
    successToast("Product update screen opened");
    navigate(`/dashboard/products/edit/${product._id}`);
  };

  // 🔹 DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "stock", headerName: "Stock", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-3 text-xl">
          <MdEdit
            className="text-blue-600 cursor-pointer"
            title="Edit Product"
            onClick={() => handleEdit(params.row.original)}
          />
          <MdDelete
            className="text-red-600 cursor-pointer"
            title="Delete Product"
            onClick={() => handleDelete(params.row.mongoId)}
          />
        </div>
      ),
    },
  ];

  // 🔹 MongoDB → DataGrid rows
  const rows = products.map((product, index) => ({
    id: index + 1,
    mongoId: product._id,
    title: product.title,
    price: product.price,
    category: product.category,
    stock: product.stock,
    original: product,
  }));

  // 🔍 Search filter
  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold mb-4">Products Management</h1>

      <input
        type="text"
        placeholder="Search product..."
        className="border px-3 py-2 mb-4 w-64"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={() => navigate("/dashboard/products/addproduct")}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          + Add Product
        </button>
      </div>


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

export default Products;

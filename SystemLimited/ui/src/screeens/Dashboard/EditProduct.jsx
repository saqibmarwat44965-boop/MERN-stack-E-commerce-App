import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { successToast, errorToast } from "../../message/toastify";
import { useAuth } from "../../context/Auth";
import apis from "../../config/apis";

const EditProduct = () => {
    const { id } = useParams();              // product id from URL
    const navigate = useNavigate();
    const [auth] = useAuth();
     const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    // 🔹 Product state (ALL fields explicitly defined)
    const [product, setProduct] = useState({
        title: "",
        subTitle: "",
        price: "",
        category: "",
        brand: "",
        description: "",
        onSale: "",
        discount: "",
        stock: "",
        rating: "",
        sku: "",
        weight: "",
        warranty_information: "",
        image: "",
    });

    // 🔹 Fetch single product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${apis[0]}/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                },
            });

            setProduct(data.product);
        } catch (error) {
            errorToast("Failed to load product");
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    // 🔹 Update product
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // append text fields
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subTitle", product.subTitle);
    formData.append("brand", product.brand);
    formData.append("description", product.description);
    formData.append("onSale", product.onSale);
    formData.append("discount", product.discount);
    formData.append("stock", product.stock);
    formData.append("rating", product.rating);
    formData.append("sku", product.sku);
    formData.append("weight", product.weight);
    formData.append("warranty_information", product.warranty_information);

    // append image ONLY if selected
    if (image) {
      formData.append("image", image);
    }

    await axios.put(`${apis[0]}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    successToast("Product updated successfully");
    navigate("/dashboard/products");

  } catch (error) {
    console.error(error);
    errorToast("Failed to update product");
  }
};



    return (
        <div className="p-6 max-w-xl">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-3">

                <input
                    type="text"
                    placeholder="Title"
                    value={product.title}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    className="border p-2 w-full"
                    required
                />

                <input
                    type="text"
                    placeholder="Sub Title"
                    value={product.subTitle}
                    onChange={(e) => setProduct({ ...product, subTitle: e.target.value })}
                    className="border p-2 w-full"
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="border p-2 w-full"
                    required
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="border p-2 w-full"
                    required
                />

                <input
                    type="text"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                    className="border p-2 w-full"
                    required
                />

                <textarea
                    placeholder="Description"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="border p-2 w-full"
                    rows={3}
                    required
                />

                <input
                    type="number"
                    placeholder="On Sale (0 or 1)"
                    value={product.onSale}
                    onChange={(e) => setProduct({ ...product, onSale: e.target.value })}
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Discount (%)"
                    value={product.discount}
                    onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Rating"
                    value={product.rating}
                    onChange={(e) => setProduct({ ...product, rating: e.target.value })}
                    className="border p-2 w-full"
                />

                <input
                    type="text"
                    placeholder="SKU"
                    value={product.sku}
                    onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Weight"
                    value={product.weight}
                    onChange={(e) => setProduct({ ...product, weight: e.target.value })}
                    className="border p-2 w-full"
                />

                <input
                    type="text"
                    placeholder="Warranty Information"
                    value={product.warranty_information}
                    onChange={(e) =>
                        setProduct({ ...product, warranty_information: e.target.value })
                    }
                    className="border p-2 w-full"
                />

               <input
                   type="file"
                   accept="image/*"
                   onChange={(e) => setImage(e.target.files[0])}
                   className="border p-2 w-full"
                />



                <button
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;

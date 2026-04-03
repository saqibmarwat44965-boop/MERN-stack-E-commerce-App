import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
   const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    brand: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const api = "http://localhost:7200/api/v1/products";

    const newForm = new FormData();

    // append text fields
    newForm.append("title", formData.title);
    newForm.append("subTitle", formData.subTitle);
    newForm.append("brand", formData.brand);
    newForm.append("category", formData.category);
    newForm.append("price", formData.price);
    newForm.append("description", formData.description);

    // append image file
    if (image) {
      newForm.append("image", image);
    }

    const { data } = await axios.post(api, newForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(data.message);
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-gray-800 rounded-3xl shadow-2xl p-10 space-y-6"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Add New Product
        </h1>


        {/* Title & SubTitle */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
           type="file"
           name="image"
           accept="image/*"
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            placeholder="Sub Title"
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* Brand & Category */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* Price */}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price ($)"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Product Description"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct

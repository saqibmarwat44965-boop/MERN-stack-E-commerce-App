import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apis from "../config/apis";

const Single = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const api = `${apis[0]}/${id}`;
      const { data } = await axios.get(api);
      setProduct(data.product);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        <p className="text-xl animate-pulse">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-3xl shadow-2xl p-8 text-white">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-center">
          {product.title}
        </h1>

        {/* Brand & Category */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-300">
            Brand: <span className="font-semibold text-white">{product.brand}</span>
          </p>
          <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-teal-400 mb-6 text-center">
          ${product.price}
        </p>

        {/* Description */}
        <div className="bg-gray-700 rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-2">Product Description</h2>
          <p className="text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl transition text-white"
          >
            ← Back to Home
          </Link>

          <button
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Single;


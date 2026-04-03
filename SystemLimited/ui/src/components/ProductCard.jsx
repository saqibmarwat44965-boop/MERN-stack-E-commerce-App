import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import apis from "../config/apis";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { successToast ,errorToast} from "../message/toastify";



const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  // Temporary handlers (later connect cart & wishlist)
  const [auth] = useAuth();
  
  const handleAddToCart = async () => {
  if (!auth?.token) return errorToast("Please login first");

  try {
    const res = await axios.post(
      `${apis[3]}/add`,
      { productId: product._id },
      { headers: { Authorization: `Bearer ${auth.token}` } } // <-- must exist
    );
    successToast("Added to cart");
    navigate("/cart")
  } catch (err) {
    console.error("Add to cart error:", err.response?.data || err.message);
    errorToast(err.response?.data?.error || "Failed to add cart");
  }
};

  //  const handleAddToCart = async () => {
  //   if (!auth?.token) return errorToast("Please login first");

  //   try {
  //     const res = await axios.post(
  //       `${apis[3]}/add`,
  //       { productId: product._id },
  //       { headers: { Authorization: `Bearer ${auth.token}` } }
  //     );
  //     console.log("Cart response:", res.data);
  //     successToast("Added to cart");
  //   } catch (err) {
  //     console.error("Add to cart error:", err.response?.data || err.message);
  //     errorToast(err.response?.data?.error || "Failed to add cart");
  //   }
  // };

  const addToWishlist = (e) => {
    e.preventDefault();
    console.log("Added to wishlist:", product.title);
    alert("Added to Wishlist ❤️");
  };

  // Discount calculation
  const discount = product.discount || 0;
  const price = Number(product.price) || 0; // ensure it's a number
  const discountedPrice =
    discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;

  return (
    <div className="relative bg-gray-800 rounded-2xl shadow-xl w-64 overflow-hidden hover:shadow-2xl transition">

      {/* Sale Badge */}
      {discount > 0 && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}% OFF
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={addToWishlist}
        className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-red-500 hover:scale-110 transition"
      >
        <FaHeart />
      </button>

      {/* Product Image */}
     <Link to={`/products/${product._id}`}>
  <img
      src={
        product.image
        ? `${apis[2]}${product.image}`
        : "https://via.placeholder.com/300x200?text=No+Image"
        }
         alt={product.title}
         className="w-full h-40 object-cover"
         
      />
      </Link>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold text-white truncate">{product.title}</h2>
        <p className="text-sm text-gray-400">{product.brand}</p>

        <div className="flex justify-center items-center gap-2 mt-2">
          <p className="text-teal-400 font-bold text-lg">${discountedPrice}</p>
          {discount > 0 && (
            <p className="line-through text-gray-500 text-sm">${price}</p>
          )}
        </div>

      <button
      onClick={handleAddToCart}
      className="mt-3 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl w-full"
    >
      Add to Cart
    </button>
      </div>
    </div>
  );
};

export default ProductCard;

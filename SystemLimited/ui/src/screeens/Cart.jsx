import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";
import apis from "../config/apis";
import { errorToast, successToast } from "../message/toastify";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useState([]);

  // 🔹 Fetch Cart
  const getCart = async () => {
    try {
      const { data } = await axios.get(`${apis[3]}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
        
      });

      setCart(data?.cart?.items || []);
      console.log("FRONT CART:", data);
    } catch (err) {
      console.error(err);
      errorToast("Failed to load cart");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getCart();
    }
  }, [auth?.token]);

  // 🔹 Remove Item
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${apis[3]}/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      successToast("Item removed");
      getCart(); // refresh
    } catch (err) {
      errorToast("Failed to remove item");
    }
  };


  // 🔹 Calculate Total
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.product.price) || 0;
    return total + price * item.quantity;
  }, 0);


  const updateQuantity = async (productId, action) => {
    try {
      await axios.put(
        `${apis[3]}/update`,
        { productId, action },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      getCart(); // refresh cart
    } catch (err) {
      console.error(err);
      errorToast("Failed to update quantity");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center bg-gray-800 rounded-xl p-4 shadow-md"
              >
                {/* Image */}
                <img
                  src={`${apis[2]}${item.product.image}`}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-bold">
                    {item.product.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {item.product.brand}
                  </p>
                  <p className="text-teal-400 font-semibold mt-1">
                    ${item.product.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.product._id, "dec")}
                      className="px-3 py-1 bg-gray-700 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.product._id, "inc")}
                      className="px-3 py-1 bg-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="text-teal-400 font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-teal-600 hover:bg-teal-700 py-3 rounded-xl font-bold">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
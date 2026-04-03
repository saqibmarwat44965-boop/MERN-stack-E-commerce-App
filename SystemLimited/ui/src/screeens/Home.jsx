import React, { useEffect, useState } from "react";
import axios from "axios";
import apis from "../config/apis";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(apis[0]);
      const { products } = data;
      setProducts(products);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-gray-300 via-gray-600 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-10">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {products.length > 0 ? (
            products.map((product) => (
              
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-300 col-span-full mt-10">
              No products available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

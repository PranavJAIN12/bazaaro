"use client";

import Category from "@/components/Category";
import PopularProd from "@/components/PopularProd";
// import PopularProducts from "@/components/PopularProducts";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const[popularProd, setPopularProd] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        setCategories(data);
        console.log("Fetched categories:", data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setPopularProd(data);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };
    fetchCategories();
    fetchPopularProducts()
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Category key={category} title={category} />
        ))}
      </div>

      {/* Popular Products */}
      <h2 className="text-2xl font-bold text-center mb-8 mt-9">Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularProd.map((product) => (
          <PopularProd key={product.id} title={product.title} image={product.image} price={product.price} />
        ))}
      </div>
    </div>
  );
}

"use client";

import Category from "@/components/Category";
import PopularProd from "@/components/PopularProd";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


export default  function Home() {
  const [categories, setCategories] = useState([]);
  const [popularProd, setPopularProd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);
 


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
        console.log("Fetched categories:", data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchPopularProducts = async (newLimit) => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products?limit=${limit}`
        );
        const data = await response.json();
        setPopularProd(data);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };
    fetchCategories();
    fetchPopularProducts();
  }, []);



  const handleNextPage = async () => {
    console.log("btn");

    // Update the limit first
    setLimit((prevLimit) => {
      const newLimit = prevLimit + 8;
      // Now fetch the data with the updated limit
      fetchPopularProducts(newLimit);
      return newLimit; // Update the state
    });
  };

  const fetchPopularProducts = async (newLimit) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${newLimit}`
      );
      const data = await response.json();
      setPopularProd(data); // Update your products with the new data
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  const handlePrevPage = async () => {
    console.log("btn");
    setLimit(limit - 8);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${limit}`
      );
      const data = await response.json();
      setPopularProd(data);
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-slate-700">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Category key={category} title={category} />
        ))}
      </div>

      {/* Popular Products */}
      <h2 className="text-2xl font-bold text-center mb-8 mt-9">
        Popular Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
        {popularProd.map((product) => (
          <PopularProd
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            id={product.id}
            product={product}
          />
        ))}
      </div>
      <div className="justify-between flex mt-4">
        <Button disabled={limit === 8} onClick={handlePrevPage}>
          Show less
        </Button>
        <Button onClick={handleNextPage}>Show More</Button>
      </div>
    </div>
  );
}

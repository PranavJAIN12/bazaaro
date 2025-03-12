"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/router";


const Products = ({id}) => {
    // const router = useRouter()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    setCategory(categoryParam);

    if (categoryParam) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${categoryParam}?limit=10`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-slate-700">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
        {/* <button 
          onClick={() => router.back()} 
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button> */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold  text-center capitalize">
          {category} Collection
        </h1>
        <p className=" text-center mt-2">
          Discover our curated selection of {category} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div 
              key={product.id} 
              className=" rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-4 flex items-center justify-center border-2 h-64">
                <div className="relative w-48 h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    
                    className="object-contain max-h-full transition-transform duration-300 group-hover:scale-110"
                    width={150}
                    height={150}
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow ">
                <h2 className="font-semibold  text-lg mb-2 line-clamp-1">
                  {product.title}
                </h2>
                <p className=" text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <p className="">
                Rating: {product.rating?.rate} ({product.rating?.count} reviews)
              </p>
                <div className="mt-auto">
                  <p className=" text-xl font-semibold mb-4">
                    ${product.price}
                  </p>
                  <Link 
                    href={`/products/${encodeURIComponent(product.id)}`} 
                    className="block"
                  >
                    <Button className="w-full  hover:bg-slate-700  transition-colors">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-600">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
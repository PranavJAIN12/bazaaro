"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Truck, Shield, RotateCcw, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { add } from "@/redux/CartSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 transition-all duration-200 ${
          index < Math.round(rating)
            ? "fill-yellow-400 text-yellow-400 scale-110"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  // const sizes = ["XS", "S", "M", "L", "XL"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-slate-700">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  const handleCartAdd = (product) => {
    dispatch(add(product));
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>

        <div className="border-2 rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="aspect-square relative  rounded-lg overflow-hidden group">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  fill
                  className="object-contain p-4 grayscale group-hover:grayscale-0 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square relative  rounded-lg overflow-hidden border-2"
                  >
                    <Image
                      src={product?.image}
                      alt={product?.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-slate-500 uppercase tracking-wide text-sm">
                  {product?.category}
                </p>
                <h1 className="text-3xl font-bold  mt-2">
                  {product?.title}
                </h1>
                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    {renderStars(product.rating?.rate ?? 0)}
                  </div>
                  <p className="ml-2 text-sm ">
                    ({product.rating?.count} reviews)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-4xl font-bold ">
                  ${product?.price}
                </p>
                <p className=" leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Size Selector */}
              {/* <div>
                <label className="block text-sm font-medium  mb-2">
                  Select Size
                </label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-slate-900 "
                          : "bg-gray-50 text-slate-900 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      className="flex-1  hover:bg-slate-800 active:scale-95 transition-transform"
                      onClick={() => handleCartAdd(product)}
                    >
                      Add to Cart
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>A message for you</AlertDialogTitle>
                      <AlertDialogDescription>
                        You can customize the quantity of this product in the
                        cart page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  variant="outline"
                  className="px-4 transition-all duration-200 hover:text-red-500 hover:border-red-500"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 " />
                  <div>
                    <p className="text-sm font-medium ">
                      Free Delivery
                    </p>
                    <p className="text-sm ">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 " />
                  <div>
                    <p className="text-sm font-medium ">
                      2 Year Warranty
                    </p>
                    <p className="text-sm ">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 " />
                  <div>
                    <p className="text-sm font-medium ">
                      Free Returns
                    </p>
                    <p className="text-sm ">Within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

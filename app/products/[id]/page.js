"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Truck, Shield, RotateCcw, Heart } from 'lucide-react';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
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
        className={`w-4 h-4 ${
          index < Math.round(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden group">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
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
                <p className="text-slate-500 uppercase tracking-wide text-sm">{product.category}</p>
                <h1 className="text-3xl font-bold text-slate-900 mt-2">{product.title}</h1>
                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    {renderStars(product.rating?.rate)}
                  </div>
                  <p className="ml-2 text-sm text-slate-500">
                    ({product.rating?.count} reviews)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-4xl font-bold text-slate-900">${product.price}</p>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Size</label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white'
                          : 'bg-gray-50 text-slate-900 hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              {/* <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 rounded-md bg-gray-50 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 rounded-md bg-gray-50 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800">
                  Add to Cart
                </Button>
                <Button variant="outline" className="px-4">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Free Delivery</p>
                    <p className="text-sm text-slate-500">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">2 Year Warranty</p>
                    <p className="text-sm text-slate-500">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Free Returns</p>
                    <p className="text-sm text-slate-500">Within 30 days</p>
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
"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        // You can modify this URL to match your API endpoint
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        
        // Filter products based on search query
        const filteredProducts = data.filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-slate-700">Searching products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">
        Search Results for &quot;{query}&quot;
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found matching your search.</p>
          <Link href="/">
            <Button className="mt-4">Return to Home</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-4 flex items-center justify-center bg-white h-64">
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

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-semibold text-slate-800 text-lg mb-2 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto">
                  <p className="text-slate-800 text-xl font-semibold mb-4">
                    ${product.price}
                  </p>
                  <Link 
                    href={`/products/${encodeURIComponent(product.id)}`}
                    className="block"
                  >
                    <Button className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
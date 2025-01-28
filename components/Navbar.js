"use client"
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ModeToggle } from './theme-btn';

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemsCount = 2;
  const categories = [""];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className="bg-opacity-70 backdrop-blur mb-9 top-0 sticky z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xl font-bold">Bazaaro</span>
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 justify-center max-w-2xl px-8">
            <div className="relative w-full">
              <div className="flex">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-10 h-10 rounded-l-md border-gray-700 focus:ring-1 focus:ring-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  className="rounded-l-none h-10"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative ">
              <Link href="/cart">
              
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              </Link>
            </Button>
            
            <Button variant="outline">
              Login
            </Button>
            <Button variant="outline">
              Signup
            </Button>
            <ModeToggle/>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-6 w-6 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black text-white">
                  <div className="flex flex-col space-y-4 mt-8">
                    {/* Mobile Search */}
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pl-4 pr-10 bg-gray-900 text-white border-gray-700 focus:ring-1 focus:ring-gray-500"
                      />
                      <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>

                    {/* Mobile Categories */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-gray-400">Categories</h4>
                      {categories.map((category) => (
                        <a
                          key={category}
                          href={`/category/${category.toLowerCase()}`}
                          className="block py-2 text-sm hover:text-gray-300"
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:flex items-center space-x-8 py-3">
          {categories.map((category) => (
            <a
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
